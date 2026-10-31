import { Heading } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InfoCard, SimplePage } from "@/components/marketing/SimplePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCatalog } from "@/content/store";
import type { CatalogPeak } from "@/content/types";
import { canonical } from "@/lib/site";
import { getFactLabels } from "@/lib/trip-facts-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "peaksIndex" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: { canonical: canonical("/peaks") },
  };
}

const groups = [
  {
    key: "trekking",
    match: (peak: CatalogPeak) => peak.classification.startsWith("nma-"),
  },
  {
    key: "expedition",
    match: (peak: CatalogPeak) => peak.classification === "expedition-peak",
  },
] as const;

export default async function PeaksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("peaksIndex");
  const facts = await getFactLabels();
  const metres = (value: number) => `${facts.number(value)} m`;
  const { getTrips, peaks, regions } = await getCatalog();
  const regionName = new Map(regions.map((region) => [region.slug, region.name]));
  const published = getTrips("published");
  const sections = groups.map((group) => ({
    title: t(`${group.key}.title`),
    lead: t(`${group.key}.lead`),
    peaks: peaks
      .filter((peak) => group.match(peak))
      .sort((a, b) => a.heightM - b.heightM)
      .map((peak) => ({
        peak,
        trip: published.find((trip) => trip.peaks.includes(peak.slug)),
      })),
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: t("title"),
          itemListElement: sections
            .flatMap((section) => section.peaks)
            .map(({ peak }, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: canonical(`/peaks/${peak.slug}`),
              name: peak.name,
            })),
        }}
      />
      <SimplePage
        title={t("title")}
        path="/peaks"
        eyebrow={t("eyebrow")}
        lead={t("lead")}
        aside={
          <InfoCard title={t("beforeYouClimb")}>
            <ul className="grid gap-1">
              <li>
                <a
                  className="text-foreground underline-offset-4 hover:underline"
                  href="/guides/your-first-trekking-peak"
                >
                  {t("firstPeakGuide")}
                </a>
              </li>
              <li>
                <a
                  className="text-foreground underline-offset-4 hover:underline"
                  href="/guides/acclimatization-explained"
                >
                  {t("altitudeGuide")}
                </a>
              </li>
              <li>
                <a
                  className="text-foreground underline-offset-4 hover:underline"
                  href="/permits"
                >
                  {t("climbingPermits")}
                </a>
              </li>
            </ul>
          </InfoCard>
        }
      >
        {sections.map((section) =>
          section.peaks.length > 0 ? (
            <section key={section.title} className="mt-6 grid gap-4 first:mt-0">
              <Heading as="h2">{section.title}</Heading>
              <p className="text-muted-foreground">{section.lead}</p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {section.peaks.map(({ peak, trip }) => (
                  <li key={peak.slug}>
                    <a
                      href={`/peaks/${peak.slug}`}
                      className="block h-full rounded-xl border border-border bg-surface p-5 shadow-1 transition-shadow hover:shadow-2"
                    >
                      <span className="block font-semibold">{peak.name}</span>
                      <span className="mt-1 block text-small text-muted-foreground">
                        {[metres(peak.heightM), regionName.get(peak.region)]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                      {trip ? (
                        <span className="mt-2 block text-small text-primary">
                          {trip.title}
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null,
        )}
      </SimplePage>
    </>
  );
}
