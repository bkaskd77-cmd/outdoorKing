import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PersonalizedTrips } from "@/components/marketing/PersonalizedTrips";
import { TripBrowser, type BrowserTrip } from "@/components/marketing/TripBrowser";
import { getCatalog } from "@/content/store";
import { canonical, hreflangMap } from "@/lib/site";
import { difficultyName, tripFacts } from "@/lib/trip-facts";

export const metadata: Metadata = {
  title: "Journeys",
  description: "Private Himalayan treks, climbs and tours. Designed around your dates.",
  alternates: {
    canonical: canonical("/trips"),
    languages: hreflangMap("/trips"),
  },
};

export default async function TripsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { activities, regions, getTrips } = await getCatalog();
  const published = getTrips("published");
  const regionName = new Map(regions.map((region) => [region.slug, region.name]));
  const trips: BrowserTrip[] = published.map((trip) => ({
    slug: trip.slug,
    title: trip.title,
    activity: trip.activity,
    regions: trip.regions,
    difficulty: trip.difficulty,
    days: trip.durationTypical,
    eyebrow: trip.regions.map((slug) => regionName.get(slug) ?? slug).join(" · "),
    facts: tripFacts(trip),
    ...(trip.photos?.[0] ? { photo: trip.photos[0] } : {}),
  }));
  const used = (values: string[]) => new Set(values);
  const usedActivities = used(published.map((trip) => trip.activity));
  const usedRegions = used(published.flatMap((trip) => trip.regions));
  const usedDifficulties = used(published.map((trip) => trip.difficulty));
  return (
    <main id="content">
      <PersonalizedTrips />
      <Section>
        <Container>
          <Heading as="h1">{t("journeysHeading")}</Heading>
          <Text className="mt-4 max-w-[60ch]">
            Private treks, tours and climbs across Nepal. Every one is a starting point:
            we shape the days, pace and comfort around you.
          </Text>
          <div className="mt-10">
            <TripBrowser
              trips={trips}
              activities={activities
                .filter((activity) => usedActivities.has(activity.slug))
                .map((activity) => ({ value: activity.slug, label: activity.title }))}
              regions={regions
                .filter((region) => usedRegions.has(region.slug))
                .map((region) => ({ value: region.slug, label: region.name }))}
              difficulties={(
                ["easy", "moderate", "challenging", "strenuous", "technical"] as const
              )
                .filter((difficulty) => usedDifficulties.has(difficulty))
                .map((difficulty) => ({
                  value: difficulty,
                  label: difficultyName(difficulty),
                }))}
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
