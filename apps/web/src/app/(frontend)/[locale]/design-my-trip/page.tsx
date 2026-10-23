import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { DesignWizard } from "@/components/quote/DesignWizard";
import { getTrips } from "@/content/catalog";
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
  searchParams: Promise<{ trip?: string; activity?: string }>;
}) {
  const { locale } = await params;
  const { trip, activity } = await searchParams;
  setRequestLocale(locale);
  const trips = getTrips("published").map((item) => ({
    slug: item.slug,
    title: item.title,
  }));
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">Design my trip</Heading>
          <Text className="mt-4">
            Six steps. An AI-assisted draft for specialist review, then a private quote —
            never a public price, and no payment in this phase.
          </Text>
          <div className="mt-8">
            <DesignWizard trip={trip} activity={activity} trips={trips} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
