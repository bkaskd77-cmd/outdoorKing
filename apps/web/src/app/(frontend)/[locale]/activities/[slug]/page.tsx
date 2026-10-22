import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { activities, tripsByActivity } from "@/content/catalog";
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
  const activity = activities.find((item) => item.slug === slug);
  if (!activity) notFound();
  const trips = tripsByActivity(slug);
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">{activity.title}</Heading>
          <Text className="mt-4">{activity.summary}</Text>
          <ul className="mt-8 grid gap-3">
            {trips.map((trip) => (
              <li key={trip.slug}>
                <a href={`/trips/${trip.slug}`}>{trip.title}</a>
                {trip.status === "draft" ? (
                  <span className="ml-2 text-caption text-muted-foreground">Draft</span>
                ) : null}
              </li>
            ))}
            {trips.length === 0 ? (
              <li>Journeys for this activity are still being written.</li>
            ) : null}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
