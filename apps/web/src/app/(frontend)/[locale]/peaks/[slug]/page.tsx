import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

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
  const peak = (await getCatalog()).getPeak(slug);
  if (!peak) notFound();
  return (
    <main id="content">
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
      <Section>
        <Container>
          <Heading as="h1">{peak.name}</Heading>
          <Text className="mt-4">{`${peak.name} stands ${String(peak.heightM)} m. Classification: ${peak.classification}.`}</Text>
        </Container>
      </Section>
    </main>
  );
}
