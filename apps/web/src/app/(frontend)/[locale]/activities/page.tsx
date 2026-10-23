import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ActivityCard } from "@/components/marketing/ActivityCard";
import { Picture } from "@/components/media/Picture";
import { JsonLd } from "@/components/seo/JsonLd";
import { activities } from "@/content/catalog";
import { heroPicture } from "@/content/media";
import { activityIntel, altitudeChip, durationChip } from "@/lib/activity-intel";
import { canonical, hreflangMap } from "@/lib/site";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Private treks, tours, peak climbs and expeditions in Nepal. Quoted — never listed as a public price.",
  alternates: {
    canonical: canonical("/activities"),
    languages: hreflangMap("/activities"),
  },
};

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
  const listed = INDEX_SLUGS.map((slug) =>
    activities.find((item) => item.slug === slug),
  ).filter((item): item is (typeof activities)[number] => Boolean(item));
  const cards = listed.map((activity) => {
    const intel = activityIntel(activity.slug);
    const facts = [
      intel?.routeCount
        ? `${String(intel.routeCount)} ${intel.routeCount === 1 ? "route" : "routes"}`
        : null,
      altitudeChip(intel?.minAltitudeM, intel?.maxAltitudeM),
      durationChip(intel?.minDays, intel?.maxDays),
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
          name: "Activities",
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
        <Container className="relative z-10 py-14 md:py-16 lg:py-20">
          <p className="eyebrow text-alpenglow-300">{t("heroEyebrow")}</p>
          <h1 className="mt-4 max-w-[20rem] font-display text-display-lg text-snow-50 sm:max-w-[24rem] md:text-display-xl">
            Choose how you want to travel.
          </h1>
          <p className="mt-5 max-w-[36ch] text-lead text-snow-100">
            Treks, tours, trekking peaks and expeditions — private, quoted to your dates.
            Never a public trip price.
          </p>
          <div className="mt-8">
            <Button variant="magnetic" size="lg" asChild>
              <a href="/design-my-trip">
                <MagneticLabel>{t("designCta")}</MagneticLabel>
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <Reveal>
            <Heading as="h2">Every register</Heading>
            <Text muted className="mt-3">
              Pick a way in, then a route — or skip ahead and tell us the pace.
            </Text>
          </Reveal>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map(({ activity, facts }) => (
              <StaggerItem key={activity.slug}>
                <ActivityCard
                  href={`/activities/${activity.slug}`}
                  title={activity.title}
                  summary={activity.summary}
                  slug={activity.slug}
                  facts={facts}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section className="bg-night-950 text-night-50">
        <Container>
          <Reveal>
            <Heading as="h2" className="text-display-lg text-snow-50">
              Not sure which register?
            </Heading>
            <Text className="mt-4 text-snow-100">
              Tell us the feeling. We quote privately.
            </Text>
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
