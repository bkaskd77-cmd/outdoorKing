import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { DesignWizard } from "@/components/quote/DesignWizard";
import { getCatalog } from "@/content/store";
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
  const trips = (await getCatalog()).getTrips("published").map((item) => ({
    slug: item.slug,
    title: item.title,
    activity: item.activity,
    regions: item.regions,
    durationMin: item.durationMin,
    durationMax: item.durationMax,
    durationTypical: item.durationTypical,
  }));
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">Design my trip</Heading>
          <Text className="mt-4">
            Six short steps. We prepare an AI-assisted draft, a trip designer reviews it,
            and you receive a private plan built around your dates.
          </Text>
          <div className="mt-8">
            <DesignWizard trip={trip} activity={activity} trips={trips} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
