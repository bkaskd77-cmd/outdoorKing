import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InfoCard, Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { guidesOf } from "@/content/guides";
import { getCatalog } from "@/content/store";
import type { CatalogTrip } from "@/content/types";
import { withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";
import { tripFacts } from "@/lib/trip-facts";
import { getFactLabels } from "@/lib/trip-facts-intl";

export async function generateStaticParams() {
  const { pages } = await getCatalog();
  return guidesOf(pages).map((guide) => ({ slug: guide.urlSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesOf((await getCatalog()).pages).find(
    (item) => item.urlSlug === slug,
  );
  if (!guide) return {};
  return {
    title: guide.title,
    description: withoutPlaceholders(guide.summary),
    alternates: { canonical: canonical(guide.path) },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { pages, getTrip } = await getCatalog();
  const all = guidesOf(pages);
  const guide = all.find((item) => item.urlSlug === slug);
  if (!guide) notFound();
  const t = await getTranslations("guides");
  const facts = await getFactLabels();
  const trips = guide.trips
    .map((tripSlug) => getTrip(tripSlug))
    .filter((trip): trip is CatalogTrip => trip?.status === "published");
  const more = all.filter(
    (item) => item.group === guide.group && item.slug !== guide.slug,
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: withoutPlaceholders(guide.summary),
          url: canonical(guide.path),
        }}
      />
      <SimplePage
        title={guide.title}
        path={guide.path}
        eyebrow={t(`group.${guide.group}`)}
        aside={
          <>
            {trips.length > 0 ? (
              <InfoCard title={t("tripsInGuide")}>
                <ul className="grid gap-2">
                  {trips.map((trip) => (
                    <li key={trip.slug}>
                      <a
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                        href={`/trips/${trip.slug}`}
                      >
                        {trip.title}
                      </a>
                      <span className="block">{tripFacts(trip, facts)}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            ) : null}
            {more.length > 0 ? (
              <InfoCard title={t("moreGuides")}>
                <ul className="grid gap-1">
                  {more.map((item) => (
                    <li key={item.slug}>
                      <a
                        className="text-foreground underline-offset-4 hover:underline"
                        href={item.path}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            ) : null}
          </>
        }
      >
        <Paragraphs text={guide.body} />
        <p className="mt-4 text-small">
          <a className="underline-offset-4 hover:underline" href="/guides">
            {t("allGuides")}
          </a>
        </p>
      </SimplePage>
    </>
  );
}
