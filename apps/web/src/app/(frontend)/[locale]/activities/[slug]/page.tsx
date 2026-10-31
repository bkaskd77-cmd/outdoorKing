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
import { activityIntel } from "@/lib/activity-intel";
import { getActivityLabels } from "@/lib/activity-intel-intl";
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
  const labels = await getActivityLabels();
  const { facts, t: ta } = labels;
  const copy = labels.hero(slug);
  const designHref = `/design-my-trip?activity=${activity.slug}`;
  const seasonNames = intel.seasons.map(
    (slug) => catalog.seasons.find((season) => season.slug === slug)?.name ?? slug,
  );
  const stats = [
    intel.routeCount ? labels.trips(intel.routeCount) : null,
    labels.altitude(intel.minAltitudeM, intel.maxAltitudeM),
    labels.duration(intel.minDays, intel.maxDays),
    seasonNames.length
      ? seasonNames.map((name) => name.replace(/ \(.*\)$/, "")).join(" · ")
      : null,
  ].filter((item): item is string => Boolean(item));
  const glance = [
    { label: ta("trips"), value: String(intel.routeCount) },
    ...(labels.altitude(intel.minAltitudeM, intel.maxAltitudeM)
      ? [
          {
            label: ta("highestPoints"),
            value: labels.altitude(intel.minAltitudeM, intel.maxAltitudeM) ?? "",
          },
        ]
      : []),
    ...(labels.duration(intel.minDays, intel.maxDays)
      ? [
          {
            label: ta("length"),
            value: labels.duration(intel.minDays, intel.maxDays) ?? "",
          },
        ]
      : []),
    ...(seasonNames.length
      ? [{ label: ta("bestSeasons"), value: seasonNames.join(", ") }]
      : []),
    ...(intel.usesLukla ? [{ label: ta("flights"), value: ta("flightsNote") }] : []),
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
        secondaryLabel={published[0] ? published[0].title : ta("seeFlagship")}
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
                {ta("atAGlance")}
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
                  <p className="text-muted-foreground">{ta("permitsWeArrange")}</p>
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
              {activity.slug === "peak-climbing" || activity.slug === "expeditions" ? (
                <p className="text-small">
                  <a className="underline-offset-4 hover:underline" href="/peaks">
                    {ta("everyPeak")}
                  </a>
                </p>
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
            <Heading as="h2">{ta("journeys", { activity: activity.title })}</Heading>
            <Text muted className="mt-3">
              {ta("journeysLead")}
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
                    summary={tripFacts(trip, facts)}
                    eyebrow={trip.regions
                      .map((slug) => regionName.get(slug) ?? slug)
                      .join(" · ")}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <div className="mt-8 rounded-xl border border-border bg-surface p-8">
              <Text>{ta("noTrips")}</Text>
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
              <Heading as="h3">{ta("moreRoutes")}</Heading>
              <Text muted className="mt-2">
                {ta("moreRoutesLead")}
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
                      {`${facts.days(trip.durationTypical)} · ${facts.upTo(facts.number(trip.maxAltitudeM))}`}
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
            <Heading as="h2">{ta("inPictures")}</Heading>
            <Text muted className="mt-3">
              {ta("inPicturesLead")}
            </Text>
          </Reveal>
          <div className="mt-8">
            <MediaGallery
              items={galleryForActivity(activity.slug)}
              label={ta("landscapes", { activity: activity.title })}
            />
          </div>
        </Container>
      </Section>

      {intel.faqs.length > 0 ? (
        <Section>
          <Container>
            <Heading as="h2">{ta("goodToKnow")}</Heading>
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
              {ta("notSure")}
            </Heading>
            <Text className="mt-4 text-snow-100">{ta("notSureLead")}</Text>
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
