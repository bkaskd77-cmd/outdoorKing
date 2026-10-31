import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { DesignWizard } from "@/components/quote/DesignWizard";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "designPage" });
  return {
    title: t("title"),
    alternates: { canonical: canonical("/design-my-trip") },
    robots: { index: true, follow: true },
  };
}

export default async function DesignMyTripPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ trip?: string; activity?: string }>;
}) {
  const { locale } = await params;
  const { trip, activity } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("designPage");
  const trips = (await getCatalog()).getTrips("published").map((item) => ({
    slug: item.slug,
    title: item.title,
    activity: item.activity,
    regions: item.regions,
    durationMin: item.durationMin,
    durationMax: item.durationMax,
    durationTypical: item.durationTypical,
  }));
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">{t("title")}</Heading>
          <Text className="mt-4">{t("lead")}</Text>
          <div className="mt-8">
            <DesignWizard trip={trip} activity={activity} trips={trips} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
