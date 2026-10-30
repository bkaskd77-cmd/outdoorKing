import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Paragraphs } from "@/components/marketing/SimplePage";
import { TripCard } from "@/components/marketing/TripCard";
import { CinematicHero } from "@/components/media/CinematicHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCatalog } from "@/content/store";
import { galleryForActivity, heroPicture } from "@/content/media";
import {
  activityHeroCopy,
  activityIntel,
  altitudeChip,
  daysLabel,
  durationChip,
} from "@/lib/activity-intel";
import { canonical } from "@/lib/site";
import { tripFacts } from "@/lib/trip-facts";

export async function generateStaticParams() {
  const { activities } = await getCatalog();
  return activities.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { activities } = await getCatalog();
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
  const catalog = await getCatalog();
  const intel = activityIntel(catalog, slug);
  const regionName = new Map(catalog.regions.map((region) => [region.slug, region.name]));
  if (!intel) notFound();
  const { activity, published, drafts } = intel;
  const copy = activityHeroCopy(slug);
  const designHref = `/design-my-trip?activity=${activity.slug}`;
  const seasonNames = intel.seasons.map(
    (slug) => catalog.seasons.find((season) => season.slug === slug)?.name ?? slug,
  );
  const stats = [
    intel.routeCount
      ? `${String(intel.routeCount)} ${intel.routeCount === 1 ? "trip" : "trips"}`
      : null,
    altitudeChip(intel.minAltitudeM, intel.maxAltitudeM),
    durationChip(intel.minDays, intel.maxDays),
    seasonNames.length
      ? seasonNames.map((name) => name.replace(/ \(.*\)$/, "")).join(" · ")
      : null,
  ].filter((item): item is string => Boolean(item));
  const glance = [
    { label: "Trips", value: String(intel.routeCount) },
    ...(altitudeChip(intel.minAltitudeM, intel.maxAltitudeM)
      ? [
          {
            label: "Highest points",
            value: altitudeChip(intel.minAltitudeM, intel.maxAltitudeM) ?? "",
          },
        ]
      : []),
    ...(durationChip(intel.minDays, intel.maxDays)
      ? [{ label: "Length", value: durationChip(intel.minDays, intel.maxDays) ?? "" }]
      : []),
    ...(seasonNames.length
      ? [{ label: "Best seasons", value: seasonNames.join(", ") }]
      : []),
    ...(intel.usesLukla
      ? [
          {
            label: "Flights",
            value: "Some trips fly to Lukla; we keep a spare day for weather.",
          },
        ]
      : []),
  ];

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
        image={activity.photo ?? heroPicture(activity.slug, activity.title)}
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
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <Reveal className="grid max-w-prose gap-4">
            <Paragraphs text={activity.body ?? activity.summary} />
          </Reveal>
          <Reveal delay={0.08}>
            <aside className="grid gap-4 rounded-xl border border-border bg-surface p-6 shadow-1 lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
              <p className="text-caption font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                At a glance
              </p>
              <dl className="grid gap-3 text-small">
                {glance.map((row) => (
                  <div key={row.label} className="grid gap-0.5">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              {intel.permits.length > 0 ? (
                <div className="grid gap-1 text-small">
                  <p className="text-muted-foreground">Permits we arrange</p>
                  <ul className="grid gap-1">
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
                </div>
              ) : null}
              <Button variant="magnetic" asChild>
                <a href={designHref}>
                  <MagneticLabel>{t("designCta")}</MagneticLabel>
                </a>
              </Button>
            </aside>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-surface-sunken">
        <Container>
          <Reveal>
            <Heading as="h2">{`${activity.title} journeys`}</Heading>
            <Text muted className="mt-3">
              Private trips for your group, each one adjusted to your dates and pace.
            </Text>
          </Reveal>
          {published.length > 0 ? (
            <Stagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {published.map((trip) => (
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
          ) : (
            <div className="mt-8 rounded-xl border border-border bg-surface p-8">
              <Text>
                No sample itinerary here yet. Tell us what you have in mind and we will
                design it with you.
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
              <Heading as="h3">More routes</Heading>
              <Text muted className="mt-2">
                These itineraries are still being prepared. Ask us about any of them.
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
                      {`${daysLabel(trip.durationTypical)} · up to ${trip.maxAltitudeM.toLocaleString("en-US")} m`}
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
            <Heading as="h2">In pictures</Heading>
            <Text muted className="mt-3">
              Open a photograph to see it full size.
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
              Tell us the pace. We design it around your dates.
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
