import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { InfoCard, Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { peakClassName } from "@/content/permit-peak-copy";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";
import { tripFacts } from "@/lib/trip-facts";

export async function generateStaticParams() {
  const { peaks } = await getCatalog();
  return peaks.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const peak = (await getCatalog()).getPeak(slug);
  if (!peak) return {};
  return {
    title: peak.name,
    description: peak.description?.split("\n")[0],
    alternates: { canonical: canonical(`/peaks/${peak.slug}`) },
  };
}

export default async function PeakPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { getPeak, getTrips, regions } = await getCatalog();
  const peak = getPeak(slug);
  if (!peak) notFound();
  const region = regions.find((item) => item.slug === peak.region);
  const kind = peakClassName[peak.classification];
  const trips = getTrips("published").filter((trip) => trip.peaks.includes(peak.slug));
  const permit =
    peak.classification === "expedition-peak"
      ? {
          href: "/permits/dot-expedition-permit",
          label: "Department of Tourism expedition permit",
        }
      : kind
        ? {
            href: "/permits/nma-island-peak",
            label: "Nepal Mountaineering Association permit",
          }
        : null;
  const height = `${peak.heightM.toLocaleString("en-US")} m`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["Place", "Mountain"],
          name: peak.name,
          elevation: {
            "@type": "QuantitativeValue",
            value: peak.heightM,
            unitCode: "MTR",
          },
        }}
      />
      <SimplePage
        title={peak.name}
        path={`/peaks/${peak.slug}`}
        eyebrow={[kind, region?.name].filter(Boolean).join(" · ") || "Peaks"}
        lead={`${height} above sea level.`}
        aside={
          <>
            <InfoCard title="At a glance">
              <p>{`Height: ${height}`}</p>
              {kind ? <p>{kind}</p> : null}
              {region ? (
                <p>
                  {"Region: "}
                  <a
                    className="text-foreground underline-offset-4 hover:underline"
                    href={`/regions/${region.slug}`}
                  >
                    {region.name}
                  </a>
                </p>
              ) : null}
              {permit ? (
                <p>
                  {"Climbed on a "}
                  <a
                    className="text-foreground underline-offset-4 hover:underline"
                    href={permit.href}
                  >
                    {permit.label}
                  </a>
                </p>
              ) : null}
            </InfoCard>
            {trips.length > 0 ? (
              <InfoCard title="Climb it with us">
                <ul className="grid gap-2">
                  {trips.map((trip) => (
                    <li key={trip.slug}>
                      <a
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                        href={`/trips/${trip.slug}`}
                      >
                        {trip.title}
                      </a>
                      <span className="block">{tripFacts(trip)}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            ) : null}
          </>
        }
      >
        <Paragraphs text={peak.description ?? `${peak.name} stands ${height} high.`} />
      </SimplePage>
    </>
  );
}
