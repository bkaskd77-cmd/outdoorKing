import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

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

export default async function RegionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { regions, tripsByRegion } = await getCatalog();
  const region = regions.find((item) => item.slug === slug);
  if (!region) notFound();
  const trips = tripsByRegion(slug);
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">{region.name}</Heading>
          <Text className="mt-4">{region.summary}</Text>
          <Text muted className="mt-4">
            {region.access}
          </Text>
          <p className="mt-4 text-small">{`Altitude range ${String(region.altitudeMinM)}–${String(region.altitudeMaxM)} m.`}</p>
          <ul className="mt-8 grid gap-3">
            {trips.map((trip) => (
              <li key={trip.slug}>
                <a href={`/trips/${trip.slug}`}>{trip.title}</a>
                {trip.status === "draft" ? (
                  <span className="ml-2 text-caption text-muted-foreground">Draft</span>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
