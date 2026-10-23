import { Container, Heading, Section, Text } from "@ok/ui";
import { Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PersonalizedTrips } from "@/components/marketing/PersonalizedTrips";
import { TripCard } from "@/components/marketing/TripCard";
import { getTrips } from "@/content/catalog";
import { canonical, hreflangMap } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journeys",
  description:
    "Private Himalayan treks, climbs and tours. Quoted, never priced in public.",
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
  const published = getTrips("published");
  const drafts = getTrips("draft");
  return (
    <main id="content">
      <PersonalizedTrips />
      <Section>
        <Container>
          <Heading as="h1">{t("journeysHeading")}</Heading>
          <Text className="mt-4">
            Private itineraries. Three flagship pages are published; the rest of the
            library is a published-ready draft until human review.
          </Text>
          <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
            {published.map((trip) => (
              <StaggerItem key={trip.slug}>
                <TripCard
                  href={`/trips/${trip.slug}`}
                  slug={trip.slug}
                  title={trip.title}
                  summary={trip.subtitle}
                  eyebrow={`${trip.regions.join(" · ")} · ${String(trip.durationTypical)} days · max ${String(trip.maxAltitudeM)} m`}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <Heading as="h2" className="mt-16">
            Drafts in review
          </Heading>
          <ul className="mt-6 grid gap-3">
            {drafts.map((trip) => (
              <li key={trip.slug}>
                <a href={`/trips/${trip.slug}`}>{trip.title}</a>
                <span className="ml-2 text-caption text-muted-foreground">Draft</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
