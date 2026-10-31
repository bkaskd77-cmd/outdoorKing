import { Button, Heading } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InfoCard, Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { companyFacts } from "@/content/catalog";
import { getCatalog } from "@/content/store";
import { isPlaceholder } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: { canonical: canonical("/about") },
  };
}

const facts: { label: string; value: string }[] = [
  { label: "registeredAs", value: companyFacts.legalEntity },
  { label: "licence", value: companyFacts.licenceNo },
  { label: "operatingSince", value: companyFacts.years },
  { label: "address", value: companyFacts.address },
  { label: "memberships", value: companyFacts.memberships },
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
  const t = await getTranslations("about");
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
      title={page?.title ?? t("title")}
      path="/about"
      eyebrow="OutdoorKing"
      lead={t("lead")}
      aside={
        <>
          {facts.length > 0 ? (
            <InfoCard title={t("companyDetails")}>
              <dl className="grid gap-2">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-caption">{t(`fact.${fact.label}`)}</dt>
                    <dd className="text-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </InfoCard>
          ) : null}
          <InfoCard
            title={t("planTrip")}
            action={
              <Button variant="primary" asChild>
                <a href="/design-my-trip">{t("designMyTrip")}</a>
              </Button>
            }
          >
            <p>{t("planTripText")}</p>
          </InfoCard>
          <InfoCard
            title={t("howWeWork")}
            action={
              <Button variant="secondary" asChild>
                <a href="/trust/licence-and-legal">{t("licence")}</a>
              </Button>
            }
          >
            <p>{t("howWeWorkText")}</p>
            <ul className="grid gap-1">
              <li>
                <a className={linkClass} href="/trust/safety-and-rescue">
                  {t("safety")}
                </a>
              </li>
              <li>
                <a className={linkClass} href="/trust/responsible-travel">
                  {t("responsible")}
                </a>
              </li>
              <li>
                <a className={linkClass} href="/purpose">
                  {t("purpose")}
                </a>
              </li>
              <li>
                <a className={linkClass} href="/team">
                  {t("team")}
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
          <Heading as="h2">{t("whatWeDesign")}</Heading>
          <ul className="grid gap-4 sm:grid-cols-2">
            {offer.map((activity) => (
              <li key={activity.slug}>
                <a
                  href={`/activities/${activity.slug}`}
                  className="block h-full rounded-xl border border-border bg-surface p-5 shadow-1 transition-shadow hover:shadow-2"
                >
                  <span className="block font-semibold">{activity.title}</span>
                  <span className="mt-1 block text-caption text-muted-foreground">
                    {t("sampleJourneys", { count: activity.count })}
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
          <Heading as="h2">{t("whereWeTravel")}</Heading>
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
