import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { DesignTripForm } from "@/components/marketing/DesignTripForm";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design my trip",
  alternates: { canonical: canonical("/design-my-trip") },
  robots: { index: true, follow: true },
};

export default async function DesignMyTripPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ trip?: string }>;
}) {
  const { locale } = await params;
  const { trip } = await searchParams;
  setRequestLocale(locale);
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">Design my trip</Heading>
          <Text className="mt-4">
            Phase 1 is an interest form only — no AI designer yet. We email sales and send
            you an acknowledgement. No public prices, and no payment to request a quote.
          </Text>
          <div className="mt-8">
            <DesignTripForm trip={trip} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
