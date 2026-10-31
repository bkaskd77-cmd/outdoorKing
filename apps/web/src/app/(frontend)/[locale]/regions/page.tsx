import { Button, Container, Heading, MagneticLabel, Section, Text } from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ActivityCard } from "@/components/marketing/ActivityCard";
import { Picture } from "@/components/media/Picture";
import { JsonLd } from "@/components/seo/JsonLd";
import { heroPicture, regionPicture } from "@/content/media";
import { getCatalog } from "@/content/store";
import { canonical, hreflangMap } from "@/lib/site";
import { getFactLabels } from "@/lib/trip-facts-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regions" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonical("/regions"),
      languages: hreflangMap("/regions"),
    },
  };
}

export default async function RegionsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const tr = await getTranslations("regions");
  const facts = await getFactLabels();
  const metres = (value: number) => `${facts.number(value)} m`;
  const { regions, tripsByRegion } = await getCatalog();
  const cards = regions
    .map((region) => {
      const count = tripsByRegion(region.slug).filter(
        (trip) => trip.status === "published",
      ).length;
      const facts = [
        count > 0 ? tr("journeys", { count }) : null,
        region.altitudeMaxM > region.altitudeMinM
          ? tr("range", {
              from: metres(region.altitudeMinM),
              to: metres(region.altitudeMaxM),
            })
          : null,
      ].filter((item): item is string => Boolean(item));
      return { region, count, facts };
    })
    .filter((card) => card.count > 0);

  return (
    <main id="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: tr("title"),
          itemListElement: cards.map(({ region }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: canonical(`/regions/${region.slug}`),
            name: region.name,
          })),
        }}
      />
      <section className="relative isolate overflow-hidden bg-night-950 text-night-50">
        <div aria-hidden="true" className="absolute inset-0">
          <Picture
            image={{ ...heroPicture("everest-base-camp-trek", "Regions"), alt: "" }}
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
            {tr("heroTitle")}
          </h1>
          <p className="mt-4 max-w-[40ch] text-lead text-snow-100">{tr("heroLead")}</p>
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
          <h2 className="sr-only">{tr("everyRegion")}</h2>
          <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map(({ region, facts }) => (
              <StaggerItem key={region.slug}>
                <ActivityCard
                  href={`/regions/${region.slug}`}
                  title={region.name}
                  summary={region.summary}
                  slug={region.slug}
                  photo={region.photo ?? regionPicture(region.slug, region.name)}
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
              {tr("notSure")}
            </Heading>
            <Text className="mt-4 text-snow-100">{tr("notSureLead")}</Text>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="magnetic" size="lg" asChild>
                <a href="/design-my-trip">
                  <MagneticLabel>{t("designCta")}</MagneticLabel>
                </a>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="border-snow-100/50 bg-night-950/40 text-snow-50 hover:bg-night-950/60"
                asChild
              >
                <a href="/guides/choosing-your-trek">{tr("howToChoose")}</a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
