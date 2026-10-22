import { Heading, Text } from "@ok/ui";

import { loadStaffPricing } from "@/app/(frontend)/actions/booking";

export async function StaffIntelPanel({ tripSlug }: { tripSlug?: string }) {
  const intel = await loadStaffPricing(tripSlug);
  if (!intel) return null;
  return (
    <section>
      <Heading as="h2">Intel suggestions (staff only)</Heading>
      <Text className="mt-2">
        Advisory only. Timeouts fall back to empty. Never published on trip pages.
      </Text>
      {intel.suggestion ? (
        <p className="mt-3 text-small">
          Deposit hint {intel.suggestion.suggestedDepositPct}% ·{" "}
          {intel.suggestion.landPackageHint} · confidence {intel.suggestion.confidence}
        </p>
      ) : (
        <p className="mt-3 text-small">
          Intel service unreachable — using catalog defaults.
        </p>
      )}
      {intel.recs?.slugs.length ? (
        <p className="text-small">Similar: {intel.recs.slugs.join(", ")}</p>
      ) : null}
    </section>
  );
}
