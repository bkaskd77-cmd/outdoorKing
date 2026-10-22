import { createHmac } from "node:crypto";

export type PricingSuggestInput = {
  tripSlug?: string;
  activity?: string;
  durationDays: number;
  partySize: number;
  difficulty?: string;
};

export type PricingSuggestResult = {
  suggestedDepositPct: number;
  landPackageHint: string;
  confidence: number;
  similarTripSlugs: string[];
  staffOnly: true;
};

export type SimilarTripInput = {
  tripSlug?: string;
  regionSlugs: string[];
  activity?: string;
  durationDays?: number;
  catalog: {
    slug: string;
    activity: string;
    regions: string[];
    durationTypical: number;
  }[];
};

export type SimilarTripResult = {
  slugs: string[];
};

export type IntelClientConfig = {
  baseUrl: string;
  hmacSecret: string;
  timeoutMs?: number;
};

function sign(secret: string, timestamp: string, body: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

export async function intelRequest<T>(
  config: IntelClientConfig,
  path: string,
  payload: unknown,
): Promise<T | null> {
  if (!config.baseUrl || !config.hmacSecret) return null;
  const body = JSON.stringify(payload);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs ?? 3000);
  try {
    const res = await fetch(`${config.baseUrl.replace(/\/$/, "")}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-ok-timestamp": timestamp,
        "x-ok-signature": sign(config.hmacSecret, timestamp, body),
      },
      body,
      signal: controller.signal,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function suggestPricing(
  config: IntelClientConfig,
  input: PricingSuggestInput,
): Promise<PricingSuggestResult | null> {
  return intelRequest(config, "/v1/pricing/suggest", input);
}

export function similarTrips(
  config: IntelClientConfig,
  input: SimilarTripInput,
): Promise<SimilarTripResult | null> {
  return intelRequest(config, "/v1/recommendations/similar", input);
}
