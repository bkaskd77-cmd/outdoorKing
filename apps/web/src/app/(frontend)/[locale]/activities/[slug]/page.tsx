import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { TripCard } from "@/components/marketing/TripCard";
import { CinematicHero } from "@/components/media/CinematicHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { activities, tripsByActivity } from "@/content/catalog";
import { media } from "@/content/media";
import { canonical } from "@/lib/site";

export function generateStaticParams() {
  return activities.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activity = activities.find((item) => item.slug === slug);
  if (!activity) return {};
  return {
    title: activity.title,
    description: activity.summary,
    alternates: { canonical: canonical(`/activities/${activity.slug}`) },
  };
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const activity = activities.find((item) => item.slug === slug);
  if (!activity) notFound();
  const trips = tripsByActivity(slug);
  const isTrekking = slug === "trekking";
  const published = trips.filter((trip) => trip.status === "published");
  const listed = published.length > 0 ? published : trips;

  return (
    <main id="content">
      <CinematicHero
        compact
        eyebrow={isTrekking ? "Trekking in Nepal" : t("heroEyebrow")}
        title={isTrekking ? "Walk the Himalaya, privately." : activity.title}
        lead={activity.summary}
        primaryHref="/design-my-trip"
        primaryLabel={t("designCta")}
        secondaryHref="/trips"
        secondaryLabel="See all journeys"
      />

      <Section>
        <Container>
          <Reveal>
            <Heading as="h2">Journeys in this register</Heading>
            <Text muted className="mt-3">
              Private groups only. Every itinerary is quoted — never listed as a public
              price.
            </Text>
          </Reveal>
          {listed.length > 0 ? (
            <Stagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listed.map((trip) => (
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
          ) : (
            <Text className="mt-8">
              Journeys for this activity are still being written.
            </Text>
          )}
        </Container>
      </Section>

      {isTrekking ? (
        <Section className="bg-surface-sunken">
          <Container>
            <Reveal>
              <Heading as="h2">Ridges along the walk</Heading>
              <Text muted className="mt-3">
                Scroll or open a frame. Licensed landscapes, not claimed as our team or
                guests.
              </Text>
            </Reveal>
            <div className="mt-8">
              <MediaGallery items={media.gallery.trekking} label="Trekking landscapes" />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section className="bg-night-950 text-night-50">
        <Container>
          <Reveal>
            <Heading as="h2" className="text-display-lg text-snow-50">
              Not sure which route?
            </Heading>
            <Text className="mt-4 text-snow-100">
              Tell us the pace. We quote privately — never a public trip price.
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
