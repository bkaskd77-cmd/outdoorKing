import { Button, Heading } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { InfoCard, Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { companyFacts } from "@/content/catalog";
import { getCatalog } from "@/content/store";
import { isPlaceholder } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "OutdoorKing designs private treks, tours, trekking peaks and expeditions in Nepal, for one group at a time.",
  alternates: { canonical: canonical("/about") },
};

const facts: { label: string; value: string }[] = [
  { label: "Registered as", value: companyFacts.legalEntity },
  { label: "Tourism licence", value: companyFacts.licenceNo },
  { label: "Operating since", value: companyFacts.years },
  { label: "Address", value: companyFacts.address },
  { label: "Memberships", value: companyFacts.memberships },
].filter((fact) => !isPlaceholder(fact.value));

const linkClass = "text-foreground underline-offset-4 hover:underline";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { activities, getPage, getTrips, regions } = await getCatalog();
  const page = getPage("about");
  const published = getTrips("published");
  const offer = activities
    .map((activity) => ({
      ...activity,
      count: published.filter((trip) => trip.activity === activity.slug).length,
    }))
    .filter((activity) => activity.count > 0);
  const places = regions.filter((region) =>
    published.some((trip) => trip.regions.includes(region.slug)),
  );

  return (
    <SimplePage
      title={page?.title ?? "About"}
      path="/about"
      eyebrow="OutdoorKing"
      lead="A Nepali team designing private treks, tours and climbs across the Himalaya."
      aside={
        <>
          {facts.length > 0 ? (
            <InfoCard title="Company details">
              <dl className="grid gap-2">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-caption">{fact.label}</dt>
                    <dd className="text-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </InfoCard>
          ) : null}
          <InfoCard
            title="Plan a trip"
            action={
              <Button variant="primary" asChild>
                <a href="/design-my-trip">Design my trip</a>
              </Button>
            }
          >
            <p>
              Tell us your dates and what you want from the mountains. A trip designer
              replies with a private plan.
            </p>
          </InfoCard>
          <InfoCard
            title="How we work"
            action={
              <Button variant="secondary" asChild>
                <a href="/trust/licence-and-legal">Licence and legal</a>
              </Button>
            }
          >
            <p>Private groups only, licensed guides, and a safety policy you can read.</p>
            <ul className="grid gap-1">
              <li>
                <a className={linkClass} href="/trust/safety-and-rescue">
                  Safety and rescue
                </a>
              </li>
              <li>
                <a className={linkClass} href="/trust/responsible-travel">
                  Responsible travel
                </a>
              </li>
              <li>
                <a className={linkClass} href="/purpose">
                  Travel with Purpose
                </a>
              </li>
              <li>
                <a className={linkClass} href="/team">
                  Our team
                </a>
              </li>
            </ul>
          </InfoCard>
        </>
      }
    >
      <Paragraphs text={page?.body ?? ""} />

      {offer.length > 0 ? (
        <section className="mt-6 grid gap-4">
          <Heading as="h2">What we design</Heading>
          <ul className="grid gap-4 sm:grid-cols-2">
            {offer.map((activity) => (
              <li key={activity.slug}>
                <a
                  href={`/activities/${activity.slug}`}
                  className="block h-full rounded-xl border border-border bg-surface p-5 shadow-1 transition-shadow hover:shadow-2"
                >
                  <span className="block font-semibold">{activity.title}</span>
                  <span className="mt-1 block text-caption text-muted-foreground">
                    {`${String(activity.count)} sample ${activity.count === 1 ? "journey" : "journeys"}`}
                  </span>
                  <span className="mt-2 line-clamp-2 text-small text-muted-foreground">
                    {activity.summary}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {places.length > 0 ? (
        <section className="mt-6 grid gap-4">
          <Heading as="h2">Where we travel</Heading>
          <ul className="flex flex-wrap gap-2">
            {places.map((region) => (
              <li key={region.slug}>
                <a
                  href={`/regions/${region.slug}`}
                  className="inline-block rounded-pill border border-border bg-surface px-4 py-2 text-small transition-colors hover:bg-muted"
                >
                  {region.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </SimplePage>
  );
}
