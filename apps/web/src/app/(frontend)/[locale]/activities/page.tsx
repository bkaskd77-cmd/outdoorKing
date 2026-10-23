import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ActivityCard } from "@/components/marketing/ActivityCard";
import { CinematicHero } from "@/components/media/CinematicHero";
import { activities } from "@/content/catalog";
import { heroPicture } from "@/content/media";
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

export default async function ActivitiesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main id="content">
      <CinematicHero
        compact
        image={heroPicture("trekking", "Activities")}
        eyebrow={t("heroEyebrow")}
        title="Choose how you want to travel."
        lead="Treks, tours, trekking peaks and expeditions — all private, all quoted to your dates. Never a public trip price."
        primaryHref="/design-my-trip"
        primaryLabel={t("designCta")}
        secondaryHref="/trips"
        secondaryLabel="See flagship journeys"
      />
      <Section>
        <Container>
          <Reveal>
            <Heading as="h2">Ways in</Heading>
            <Text muted className="mt-3">
              Pick a register, then a route — or skip ahead and tell us the pace.
            </Text>
          </Reveal>
          <Stagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <StaggerItem key={activity.slug}>
                <ActivityCard
                  href={`/activities/${activity.slug}`}
                  title={activity.title}
                  summary={activity.summary}
                  slug={activity.slug}
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
