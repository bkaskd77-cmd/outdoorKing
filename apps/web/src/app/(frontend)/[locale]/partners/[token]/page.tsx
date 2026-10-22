import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { loadPartnerPortal } from "@/app/(frontend)/actions/partners";

export const metadata: Metadata = {
  title: "Partner portal",
  robots: { index: false, follow: false },
};

export default async function PartnerPortalPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  setRequestLocale(locale);
  const portal = await loadPartnerPortal(token);
  if (!portal) notFound();

  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">{portal.partnerName}</Heading>
          <Text className="mt-4">
            Referred trip requests for code {portal.code}. Status only — OutdoorKing never
            publishes prices here.
          </Text>
          <p className="mt-2 text-small text-muted-foreground">
            Share {portal.sharePath} so new requests are attributed to you.
          </p>
          <ul className="mt-8 grid gap-3">
            {portal.leads.length === 0 ? (
              <li>No referred requests yet.</li>
            ) : (
              portal.leads.map((row) => (
                <li key={row.id} className="rounded-md border border-border p-4">
                  <p className="font-semibold">
                    {row.tripSlug ?? "custom itinerary"} · {row.status}
                  </p>
                  <p className="text-small text-muted-foreground">{row.createdAt}</p>
                </li>
              ))
            )}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
