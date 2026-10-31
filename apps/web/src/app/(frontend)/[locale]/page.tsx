import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ActivityCard } from "@/components/marketing/ActivityCard";
import { GuideCard } from "@/components/marketing/GuideCard";
import { PersonalizedTrips } from "@/components/marketing/PersonalizedTrips";
import { RegionShowcase } from "@/components/marketing/RegionShowcase";
import { TripCard } from "@/components/marketing/TripCard";
import { CinematicHero } from "@/components/media/CinematicHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { guidesOf } from "@/content/guides";
import { getCatalog } from "@/content/store";
import { media, regionPicture, showcaseTripPictures } from "@/content/media";
import { canonical, hreflangMap } from "@/lib/site";
import { tripFacts } from "@/lib/trip-facts";

export const metadata: Metadata = {
  title: "Private Himalayan journeys",
  description:
    "Private treks, tours and climbs in Nepal. Designed around your dates, pace and party.",
  alternates: { canonical: canonical("/"), languages: hreflangMap("/") },
};

const steps = [
  {
    title: "Tell us your plan",
    text: "Share your dates, your group and what you want from the mountains in the trip designer. It takes a few minutes and costs nothing.",
  },
  {
    title: "We design it with you",
    text: "A trip designer builds a private, day-by-day itinerary, checks it against our altitude rules and sends you a quote. We adjust it until it fits.",
  },
  {
    title: "We look after the rest",
    text: "We arrange permits, flights, lodges, guides and porters. Your licensed guide leads the trip, and we stay in touch from start to finish.",
  },
];

const promises = [
  {
    title: "Private groups only",
    text: "Just you and the people you choose. We never add strangers.",
  },
  { title: "Licensed guides", text: "Every trek and climb is led by a licensed guide." },
  {
    title: "Altitude-checked plans",
    text: "Gradual ascent, rest days and spare days for weather, checked on every itinerary.",
  },
  {
    title: "Travel with Purpose",
    text: "5% of every booking supports social work in Nepal.",
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { activities, pages, regions, getHomeJourneys, getRegionShowcase } =
    await getCatalog();
  const homeGuides = [
    "choosing-your-trek",
    "best-time-to-trek",
    "acclimatization-explained",
  ]
    .map((slug) => guidesOf(pages).find((guide) => guide.slug === slug))
    .filter((guide) => guide !== undefined);
  const regionName = new Map(regions.map((region) => [region.slug, region.name]));
  const featured = getHomeJourneys();
  const leadActivities = activities.slice(0, 4);
  const regionShowcase = getRegionShowcase().map((region) => {
    const trips = region.trips.slice(0, 3);
    const images = showcaseTripPictures(trips, region.slug);
    return {
      slug: region.slug,
      name: region.name,
      trips: trips.map((trip, index) => ({
        slug: trip.slug,
        title: trip.title,
        facts: tripFacts(trip),
        image:
          trip.photos?.[0] ?? images[index] ?? regionPicture(region.slug, trip.title),
      })),
    };
  });

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
              "Private treks, tours, trekking peaks and expeditions in Nepal, designed around your dates, pace and group.",
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
            name: "Journeys",
            itemListElement: featured.map((trip, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: canonical(`/trips/${trip.slug}`),
              name: trip.title,
            })),
          },
        ]}
      />
      <CinematicHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        primaryHref="/design-my-trip"
        primaryLabel={t("designCta")}
        secondaryHref="/trips"
        secondaryLabel={t("exploreCta")}
      />

      <Section className="bg-surface-sunken">
        <Container>
          <Reveal>
            <Heading as="h2">How a private trip works</Heading>
            <Text muted className="mt-3 max-w-[60ch]">
              No fixed departures and no strangers. Every journey is planned for one
              group, around your dates and your pace.
            </Text>
          </Reveal>
          <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <StaggerItem key={step.title}>
                <div className="h-full rounded-xl border border-border bg-surface p-6 shadow-1">
                  <p className="text-caption font-semibold tracking-[0.12em] text-primary uppercase">
                    {`Step ${String(index + 1)}`}
                  </p>
                  <Heading as="h3" className="mt-2">
                    {step.title}
                  </Heading>
                  <Text className="mt-2 text-small text-muted-foreground">
                    {step.text}
                  </Text>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((promise) => (
              <div key={promise.title} className="border-l-2 border-primary pl-4">
                <dt className="font-semibold">{promise.title}</dt>
                <dd className="mt-1 text-small text-muted-foreground">{promise.text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="magnetic" asChild>
              <a href="/design-my-trip">
                <MagneticLabel>{t("designCta")}</MagneticLabel>
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/about">About us</a>
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Heading as="h2">{t("chooseWayIn")}</Heading>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-2">
            {leadActivities.map((activity) => (
              <StaggerItem key={activity.slug}>
                <ActivityCard
                  href={`/activities/${activity.slug}`}
                  title={activity.title}
                  summary={activity.summary}
                  slug={activity.slug}
                  photo={activity.photo}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8">
            <Button variant="secondary" asChild>
              <a href="/activities">{t("viewMoreActivities")}</a>
            </Button>
          </div>
        </Container>
      </Section>

      <PersonalizedTrips />

      <Section className="bg-surface-sunken">
        <Container>
          <Reveal>
            <Heading as="h2">{t("flagshipJourneys")}</Heading>
          </Reveal>
          <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((trip) => (
              <StaggerItem key={trip.slug}>
                <TripCard
                  href={`/trips/${trip.slug}`}
                  slug={trip.slug}
                  photo={trip.photos?.[0]}
                  title={trip.title}
                  summary={tripFacts(trip)}
                  eyebrow={trip.regions
                    .map((slug) => regionName.get(slug) ?? slug)
                    .join(" · ")}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8">
            <Button variant="secondary" asChild>
              <a href="/trips">{t("viewAllJourneys")}</a>
            </Button>
          </div>
        </Container>
      </Section>

      <RegionShowcase regions={regionShowcase} />

      <Section>
        <Container>
          <Reveal>
            <Heading as="h2">On the trail</Heading>
            <Text muted className="mt-3">
              Ridges, valleys and monasteries you walk past on our journeys.
            </Text>
          </Reveal>
          <div className="mt-8">
            <MediaGallery items={media.gallery.home} label="Home landscapes" />
          </div>
        </Container>
      </Section>

      {homeGuides.length > 0 ? (
        <Section className="bg-surface-sunken">
          <Container>
            <Reveal>
              <Heading as="h2">Plan your trip</Heading>
              <Text muted className="mt-3">
                Practical guides to choosing a route, the seasons and trekking at
                altitude.
              </Text>
            </Reveal>
            <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
              {homeGuides.map((guide) => (
                <StaggerItem key={guide.slug}>
                  <GuideCard guide={guide} />
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-6 text-small">
              <a className="underline-offset-4 hover:underline" href="/guides">
                All travel guides
              </a>
            </p>
          </Container>
        </Section>
      ) : null}

      <Section className="relative overflow-hidden bg-night-950 text-night-50">
        <Container className="relative z-10">
          <Reveal>
            <Heading as="h2" className="text-display-lg text-snow-50">
              Where would you like to wake up?
            </Heading>
            <Text className="mt-4 text-snow-100">
              Tell us the pace. We design it around your dates.
            </Text>
            <div className="mt-8">
              <Button variant="magnetic" size="lg" asChild>
                <a href="/design-my-trip">
                  <MagneticLabel>{t("designCta")}</MagneticLabel>
                </a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
