import { Button, Container, Heading, Section, Text } from "@ok/ui";
import { Parallax, Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { activities, getTrips } from "@/content/catalog";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Himalayan journeys",
  description:
    "Private treks, tours and climbs from a licensed Nepali team. Every journey is quoted — never listed as a public price.",
  alternates: { canonical: canonical("/") },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const featured = getTrips("published");

  return (
    <main id="content">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": ["Organization", "TravelAgency"],
            name: "OutdoorKing",
            url: canonical("/"),
            description:
              "Private Himalayan journeys. Licence identifiers are omitted until owner-supplied facts exist.",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "OutdoorKing",
            url: canonical("/"),
            potentialAction: {
              "@type": "SearchAction",
              target: `${canonical("/trips")}?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Flagship journeys",
            itemListElement: featured.map((trip, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: canonical(`/trips/${trip.slug}`),
              name: trip.title,
            })),
          },
        ]}
      />
      <section className="relative flex min-h-[90svh] items-end overflow-hidden bg-night-950 text-night-50">
        <Parallax className="pointer-events-none absolute inset-0" offset={24}>
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 bg-linear-to-b from-glacier-800 via-night-900 to-night-950" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[var(--scrim)]" />
          </div>
        </Parallax>
        <Container className="relative z-10 pb-24">
          <Reveal>
            <p className="eyebrow text-alpenglow-300">
              Private journeys · Nepal · since [[TBD: founding year]]
            </p>
            <h1 className="mt-4 max-w-[18ch] font-display text-display-xl text-snow-50">
              The Himalaya, designed around you.
            </h1>
            <Text className="mt-6 max-w-[40ch] text-lead text-snow-100">
              Private treks, tours and climbs from a licensed Nepali team. Every journey
              is quoted — never listed as a public price.
            </Text>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="magnetic" size="lg" asChild>
                <a href="/design-my-trip">Design my trip</a>
              </Button>
              <Button
                variant="secondary"
                className="border-snow-100/40 text-snow-50"
                asChild
              >
                <a href="/trips">Explore journeys</a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <Heading as="h2">Choose your way in</Heading>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-2">
            {activities.slice(0, 4).map((activity) => (
              <StaggerItem key={activity.slug}>
                <article className="rounded-xl bg-surface p-8 shadow-1">
                  <Heading as="h3">
                    <a href={`/activities/${activity.slug}`}>{activity.title}</a>
                  </Heading>
                  <Text muted className="mt-2">
                    {activity.summary}
                  </Text>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section className="bg-surface-sunken">
        <Container>
          <Heading as="h2">Flagship journeys</Heading>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((trip) => (
              <li key={trip.slug} className="rounded-xl bg-surface p-6 shadow-1">
                <Heading as="h3">
                  <a href={`/trips/${trip.slug}`}>{trip.title}</a>
                </Heading>
                <Text muted className="mt-2">
                  {trip.subtitle}
                </Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
