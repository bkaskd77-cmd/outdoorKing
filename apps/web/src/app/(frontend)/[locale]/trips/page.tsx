import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PersonalizedTrips } from "@/components/marketing/PersonalizedTrips";
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
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {published.map((trip) => (
              <li key={trip.slug} className="rounded-xl bg-surface p-6 shadow-1">
                <Heading as="h2">
                  <a href={`/trips/${trip.slug}`}>{trip.title}</a>
                </Heading>
                <Text muted className="mt-2">
                  {trip.subtitle}
                </Text>
              </li>
            ))}
          </ul>
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
