import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Paragraphs } from "@/components/marketing/SimplePage";
import { TripCard } from "@/components/marketing/TripCard";
import { CinematicHero } from "@/components/media/CinematicHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { regionPicture } from "@/content/media";
import { getCatalog } from "@/content/store";
import type { CatalogPermit } from "@/content/types";
import { canonical } from "@/lib/site";
import { tripFacts } from "@/lib/trip-facts";

export async function generateStaticParams() {
  const { regions } = await getCatalog();
  return regions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { regions } = await getCatalog();
  const region = regions.find((item) => item.slug === slug);
  if (!region) return {};
  return {
    title: region.name,
    description: region.summary,
    alternates: { canonical: canonical(`/regions/${region.slug}`) },
  };
}

function metres(value: number): string {
  return `${value.toLocaleString("en-US")} m`;
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { regions, activities, tripsByRegion, getPermit } = await getCatalog();
  const region = regions.find((item) => item.slug === slug);
  if (!region) notFound();
  const trips = tripsByRegion(slug).filter((trip) => trip.status === "published");
  const activityName = new Map(activities.map((item) => [item.slug, item.title]));
  const permits = [
    ...new Map(
      trips
        .flatMap((trip) => trip.permits)
        .map((permitSlug) => getPermit(permitSlug))
        .filter((permit): permit is CatalogPermit => Boolean(permit))
        .map((permit) => [permit.slug, permit]),
    ).values(),
  ];
  const designHref = "/design-my-trip";
  const glance = [
    ...(region.access ? [{ label: "Getting there", value: region.access }] : []),
    ...(region.altitudeMaxM > region.altitudeMinM
      ? [
          {
            label: "Altitude",
            value: `${metres(region.altitudeMinM)} to ${metres(region.altitudeMaxM)}`,
          },
        ]
      : []),
    { label: "Trips", value: String(trips.length) },
  ];

  return (
    <main id="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: region.name,
          itemListElement: trips.map((trip, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: canonical(`/trips/${trip.slug}`),
            name: trip.title,
          })),
        }}
      />
      <CinematicHero
        compact
        image={region.photo ?? regionPicture(region.slug, region.name)}
        eyebrow="Regions of Nepal"
        title={region.name}
        lead={region.summary}
        primaryHref={designHref}
        primaryLabel={t("designCta")}
        secondaryHref={trips[0] ? "#trips" : "/trips"}
        secondaryLabel={trips[0] ? "See the trips" : "All trips"}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <Reveal className="grid max-w-prose gap-4">
            <Paragraphs text={region.body ?? region.summary} />
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
              {permits.length > 0 ? (
                <div className="grid gap-1 text-small">
                  <p className="text-muted-foreground">Permits we arrange</p>
                  <ul className="grid gap-1">
                    {permits.map((permit) => (
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

      <Section id="trips" className="bg-surface-sunken">
        <Container>
          <Reveal>
            <Heading as="h2">{`Trips in ${region.name}`}</Heading>
            <Text muted className="mt-3">
              Private trips for your group, each one adjusted to your dates and pace.
            </Text>
          </Reveal>
          {trips.length > 0 ? (
            <Stagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <StaggerItem key={trip.slug}>
                  <TripCard
                    href={`/trips/${trip.slug}`}
                    slug={trip.slug}
                    photo={trip.photos?.[0]}
                    title={trip.title}
                    summary={tripFacts(trip)}
                    eyebrow={activityName.get(trip.activity) ?? ""}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <Text className="mt-8">
              No sample itinerary here yet. Tell us what you have in mind and we will
              design it with you.
            </Text>
          )}
        </Container>
      </Section>
    </main>
  );
}
