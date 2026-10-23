import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { TripCard } from "@/components/marketing/TripCard";
import { AmbientVideo } from "@/components/media/AmbientVideo";
import { CinematicHero } from "@/components/media/CinematicHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { activities } from "@/content/catalog";
import { galleryForActivity, heroPicture } from "@/content/media";
import {
  activityHeroCopy,
  activityIntel,
  altitudeChip,
  durationChip,
} from "@/lib/activity-intel";
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
  const intel = activityIntel(slug);
  if (!intel) notFound();
  const { activity, published, drafts } = intel;
  const copy = activityHeroCopy(slug);
  const designHref = `/design-my-trip?activity=${activity.slug}`;
  const showVideo = ["trekking", "peak-climbing", "expeditions", "heli-treks"].includes(
    activity.slug,
  );
  const stats = [
    intel.routeCount
      ? `${String(intel.routeCount)} ${intel.routeCount === 1 ? "route" : "routes"} in the library`
      : null,
    altitudeChip(intel.minAltitudeM, intel.maxAltitudeM),
    durationChip(intel.minDays, intel.maxDays),
    intel.seasons.length ? intel.seasons.join(" · ") : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <main id="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: activity.title,
          itemListElement: published.map((trip, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: canonical(`/trips/${trip.slug}`),
            name: trip.title,
          })),
        }}
      />
      <CinematicHero
        compact
        image={heroPicture(activity.slug, activity.title)}
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={activity.summary}
        primaryHref={designHref}
        primaryLabel={t("designCta")}
        secondaryHref={published[0] ? `/trips/${published[0].slug}` : "/trips"}
        secondaryLabel={published[0] ? published[0].title : "See flagship journeys"}
        kicker={
          stats.length ? (
            <ul className="mt-8 flex flex-wrap gap-2">
              {stats.map((item) => (
                <li
                  key={item}
                  className="rounded-pill border border-snow-100/30 px-3 py-1 text-caption text-snow-50"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null
        }
      />

      <Section>
        <Container className="grid gap-8 md:grid-cols-3">
          <Reveal>
            <Heading as="h2">Who it suits</Heading>
            <Text className="mt-3">{activity.summary}</Text>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading as="h2">Altitude and timing</Heading>
            <Text className="mt-3">
              {altitudeChip(intel.minAltitudeM, intel.maxAltitudeM)
                ? `Library routes reach ${String(intel.maxAltitudeM)} m.`
                : "Altitude depends on the itinerary we design with you."}{" "}
              {intel.seasons.length
                ? `Typical seasons in this register: ${intel.seasons.join(", ")}.`
                : "Season is chosen with you — high country usually spring and autumn."}{" "}
              {intel.usesLukla
                ? "Some routes use Lukla or Ramechhap; keep a buffer day."
                : ""}
            </Text>
          </Reveal>
          <Reveal delay={0.16}>
            <Heading as="h2">Permits we handle</Heading>
            {intel.permits.length > 0 ? (
              <ul className="mt-3 grid gap-2">
                {intel.permits.map((permit) => (
                  <li key={permit.slug}>
                    <a
                      className="underline-offset-4 hover:underline"
                      href={`/permits/${permit.slug}`}
                    >
                      {permit.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Text className="mt-3">
                Permit list appears when a route in this register is published. We do not
                invent fees.
              </Text>
            )}
          </Reveal>
        </Container>
      </Section>

      {showVideo ? (
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
      ) : null}

      <Section className="bg-surface-sunken">
        <Container>
          <Reveal>
            <Heading as="h2">Journeys in this register</Heading>
            <Text muted className="mt-3">
              Private groups only. Every itinerary is quoted — never listed as a public
              price.
            </Text>
          </Reveal>
          {published.length > 0 ? (
            <Stagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          ) : (
            <div className="mt-8 rounded-xl border border-border bg-surface p-8">
              <Text>
                No published itinerary in this register yet. That is exactly what private
                design is for.
              </Text>
              <div className="mt-6">
                <Button variant="magnetic" asChild>
                  <a href={designHref}>
                    <MagneticLabel>{t("designCta")}</MagneticLabel>
                  </a>
                </Button>
              </div>
            </div>
          )}
          {drafts.length > 0 ? (
            <div className="mt-12">
              <Heading as="h3">Also in the library</Heading>
              <Text muted className="mt-2">
                Draft pages until human review. Facts are sourced; they are not yet
                flagship.
              </Text>
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {drafts.map((trip) => (
                  <li key={trip.slug}>
                    <a
                      className="underline-offset-4 hover:underline"
                      href={`/trips/${trip.slug}`}
                    >
                      {trip.title}
                    </a>
                    <span className="ml-2 text-caption text-muted-foreground">
                      {`Draft · ${String(trip.durationTypical)} days · max ${String(trip.maxAltitudeM)} m`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Heading as="h2">Light in this register</Heading>
            <Text muted className="mt-3">
              Scroll or open a frame. Licensed landscapes, not claimed as our team or
              guests.
            </Text>
          </Reveal>
          <div className="mt-8">
            <MediaGallery
              items={galleryForActivity(activity.slug)}
              label={`${activity.title} landscapes`}
            />
          </div>
        </Container>
      </Section>

      {intel.faqs.length > 0 ? (
        <Section>
          <Container>
            <Heading as="h2">Good to know</Heading>
            <dl className="mt-6 grid gap-6">
              {intel.faqs.map((faq) => (
                <div key={faq.slug}>
                  <dt className="font-semibold">{faq.question}</dt>
                  <dd className="mt-2 text-muted-foreground">{faq.answer}</dd>
                </div>
              ))}
            </dl>
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
                <a href={designHref}>
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
