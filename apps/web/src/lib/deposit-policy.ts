import { DEFAULT_DEPOSIT_POLICY } from "@ok/payments";

export type DepositPolicy = {
  depositPct: number;
  balanceDueDaysBefore: number;
};

export function defaultDepositPolicy(): DepositPolicy {
  return {
    depositPct: DEFAULT_DEPOSIT_POLICY.depositPct,
    balanceDueDaysBefore: DEFAULT_DEPOSIT_POLICY.balanceDueDaysBefore,
  };
}

/** Payload trip.depositPolicy when present; otherwise the global default. */
export function policyFromTrip(trip?: {
  depositPolicy?: { depositPct?: number; balanceDueDaysBefore?: number } | null;
}): DepositPolicy {
  const fallback = defaultDepositPolicy();
  return {
    depositPct: trip?.depositPolicy?.depositPct ?? fallback.depositPct,
    balanceDueDaysBefore:
      trip?.depositPolicy?.balanceDueDaysBefore ?? fallback.balanceDueDaysBefore,
  };
}

type PolicyFields = {
  depositPct?: number | null;
  balanceDueDaysBefore?: number | null;
};

/**
 * Trip-level Payload policy wins, then the payment-policy global, then code defaults.
 * Fail-open to defaults when Payload is unreachable (preview/CI).
 */
export async function loadConfiguredDepositPolicy(
  tripSlug?: string,
): Promise<DepositPolicy> {
  const fallback = defaultDepositPolicy();
  try {
    const { getPayload } = await import("payload");
    const { default: config } = await import("@payload-config");
    const payload = await getPayload({ config });
    const global = (await payload.findGlobal({
      slug: "payment-policy",
      overrideAccess: true,
    })) as PolicyFields;
    let tripPolicy: PolicyFields | undefined;
    if (tripSlug) {
      const found = await payload.find({
        collection: "trips",
        where: { slug: { equals: tripSlug } },
        limit: 1,
        overrideAccess: true,
        depth: 0,
      });
      const doc = found.docs[0] as { depositPolicy?: PolicyFields } | undefined;
      tripPolicy = doc?.depositPolicy;
    }
    return policyFromTrip({
      depositPolicy: {
        depositPct: tripPolicy?.depositPct ?? global.depositPct ?? fallback.depositPct,
        balanceDueDaysBefore:
          tripPolicy?.balanceDueDaysBefore ??
          global.balanceDueDaysBefore ??
          fallback.balanceDueDaysBefore,
      },
    });
  } catch {
    return fallback;
  }
}
