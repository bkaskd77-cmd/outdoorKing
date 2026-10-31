import { Heading } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { InfoCard, SimplePage } from "@/components/marketing/SimplePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCatalog } from "@/content/store";
import type { CatalogPeak } from "@/content/types";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peaks we climb in Nepal",
  description:
    "Trekking peaks such as Island Peak, Mera and Lobuche East, and expedition peaks from Ama Dablam to Everest: heights, regions and the trips that climb them.",
  alternates: { canonical: canonical("/peaks") },
};

const groups = [
  {
    title: "Trekking peaks",
    lead: "Climbed on a Nepal Mountaineering Association permit, after a trek that builds acclimatisation, with a training day and a reserve day for the weather.",
    match: (peak: CatalogPeak) => peak.classification.startsWith("nma-"),
  },
  {
    title: "Expedition peaks",
    lead: "Climbed on a Department of Tourism expedition permit, with weeks of acclimatisation rotations on the mountain before the summit push.",
    match: (peak: CatalogPeak) => peak.classification === "expedition-peak",
  },
];

function metres(value: number): string {
  return `${value.toLocaleString("en-US")} m`;
}

export default async function PeaksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { getTrips, peaks, regions } = await getCatalog();
  const regionName = new Map(regions.map((region) => [region.slug, region.name]));
  const published = getTrips("published");
  const sections = groups.map((group) => ({
    ...group,
    peaks: peaks
      .filter(group.match)
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
          name: "Peaks we climb in Nepal",
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
        title="Peaks we climb in Nepal"
        path="/peaks"
        eyebrow="Climbing"
        lead="From your first Himalayan summit to the 8,000 m giants: every peak we run trips on, lowest first."
        aside={
          <InfoCard title="Before you climb">
            <ul className="grid gap-1">
              <li>
                <a
                  className="text-foreground underline-offset-4 hover:underline"
                  href="/guides/your-first-trekking-peak"
                >
                  Climbing your first trekking peak
                </a>
              </li>
              <li>
                <a
                  className="text-foreground underline-offset-4 hover:underline"
                  href="/guides/acclimatization-explained"
                >
                  Altitude sickness and acclimatisation
                </a>
              </li>
              <li>
                <a
                  className="text-foreground underline-offset-4 hover:underline"
                  href="/permits"
                >
                  Climbing permits
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
