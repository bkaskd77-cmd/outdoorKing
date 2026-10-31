import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ActivityCard } from "@/components/marketing/ActivityCard";
import { Picture } from "@/components/media/Picture";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCatalog } from "@/content/store";
import { heroPicture } from "@/content/media";
import { activityIntel } from "@/lib/activity-intel";
import { getActivityLabels } from "@/lib/activity-intel-intl";
import { canonical, hreflangMap } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "activities" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonical("/activities"),
      languages: hreflangMap("/activities"),
    },
  };
}

const INDEX_SLUGS = [
  "trekking",
  "tours",
  "peak-climbing",
  "expeditions",
  "heli-treks",
  "cultural",
  "wildlife",
  "pilgrimage",
] as const;

export default async function ActivitiesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const tx = await getTranslations("activities");
  const labels = await getActivityLabels();
  const catalog = await getCatalog();
  const { activities } = catalog;
  const listed = INDEX_SLUGS.map((slug) =>
    activities.find((item) => item.slug === slug),
  ).filter((item): item is (typeof activities)[number] => Boolean(item));
  const cards = listed.map((activity) => {
    const intel = activityIntel(catalog, activity.slug);
    const facts = [
      intel?.routeCount ? tx("routes", { count: intel.routeCount }) : null,
      labels.altitude(intel?.minAltitudeM, intel?.maxAltitudeM),
      labels.duration(intel?.minDays, intel?.maxDays),
      intel?.seasons.length ? intel.seasons.join(" · ") : null,
    ].filter((item): item is string => Boolean(item));
    return { activity, facts };
  });

  return (
    <main id="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: tx("title"),
          itemListElement: listed.map((activity, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: canonical(`/activities/${activity.slug}`),
            name: activity.title,
          })),
        }}
      />
      <section className="relative isolate overflow-hidden bg-night-950 text-night-50">
        <div aria-hidden="true" className="absolute inset-0">
          <Picture
            image={{
              ...heroPicture("everest-base-camp-trek", "Activities"),
              alt: "",
            }}
            priority
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover object-[center_45%]"
            sizes="100vw"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-night-950/90 via-night-950/70 to-night-950/25"
        />
        <Container className="relative z-10 py-8 md:py-10">
          <p className="eyebrow text-alpenglow-300">{t("heroEyebrow")}</p>
          <h1 className="mt-3 max-w-[16ch] font-display text-display-lg leading-[1.08] text-snow-50">
            {tx("heroTitle")}
          </h1>
          <p className="mt-4 max-w-[36ch] text-lead text-snow-100">{tx("heroLead")}</p>
          <div className="mt-6">
            <Button variant="magnetic" size="lg" asChild>
              <a href="/design-my-trip">
                <MagneticLabel>{t("designCta")}</MagneticLabel>
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-6 md:py-8">
        <Container>
          <h2 className="sr-only">{tx("everyKind")}</h2>
          <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map(({ activity, facts }) => (
              <StaggerItem key={activity.slug}>
                <ActivityCard
                  href={`/activities/${activity.slug}`}
                  title={activity.title}
                  summary={activity.summary}
                  slug={activity.slug}
                  photo={activity.photo}
                  facts={facts}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <Section className="bg-night-950 text-night-50">
        <Container>
          <Reveal>
            <Heading as="h2" className="text-display-lg text-snow-50">
              {tx("notSure")}
            </Heading>
            <Text className="mt-4 text-snow-100">{tx("notSureLead")}</Text>
            <div className="mt-8">
              <Button variant="magnetic" size="lg" asChild>
                <a href="/design-my-trip">
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
