import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ActivityCard } from "@/components/marketing/ActivityCard";
import { PersonalizedTrips } from "@/components/marketing/PersonalizedTrips";
import { RegionShowcase } from "@/components/marketing/RegionShowcase";
import { TripCard } from "@/components/marketing/TripCard";
import { AmbientVideo } from "@/components/media/AmbientVideo";
import { CinematicHero } from "@/components/media/CinematicHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { activities, getHomeJourneys, getRegionShowcase } from "@/content/catalog";
import { media, regionPicture, showcaseTripPictures } from "@/content/media";
import { canonical, hreflangMap } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Himalayan journeys",
  description:
    "Private treks, tours and climbs in Nepal. Designed around your dates, pace and party.",
  alternates: { canonical: canonical("/"), languages: hreflangMap("/") },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const featured = getHomeJourneys();
  const leadActivities = activities.slice(0, 4);
  const regionShowcase = getRegionShowcase().map((region) => {
    const images = showcaseTripPictures(region.trips, region.slug);
    return {
      ...region,
      image: regionPicture(region.slug, region.name),
      trips: region.trips.map((trip, index) => ({
        ...trip,
        image: images[index] ?? regionPicture(region.slug, trip.title),
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

      <Section className="bg-night-950 text-night-50">
        <Container>
          <Reveal>
            <Heading as="h2" className="text-snow-50">
              Light on the high country
            </Heading>
            <Text className="mt-3 text-snow-100">
              A muted landscape clip — stock atmosphere, not a guest film. No sound.
            </Text>
          </Reveal>
          <div className="mt-8">
            <AmbientVideo />
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
                  title={trip.title}
                  summary={`${String(trip.durationTypical)} days typical · max ${String(trip.maxAltitudeM)} m`}
                  eyebrow={`${trip.regions.join(" · ")} · ${String(trip.durationTypical)} days · max ${String(trip.maxAltitudeM)} m`}
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
            <Heading as="h2">Ridges, not portraits</Heading>
            <Text muted className="mt-3">
              Scroll or open a frame. These are licensed landscapes, not claimed as our
              team or reviews.
            </Text>
          </Reveal>
          <div className="mt-8">
            <MediaGallery items={media.gallery.home} label="Home landscapes" />
          </div>
        </Container>
      </Section>

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
