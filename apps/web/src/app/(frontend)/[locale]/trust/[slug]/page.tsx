import { Heading } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

const slugs = [
  "licence-and-legal",
  "safety-and-rescue",
  "insurance",
  "reviews",
  "responsible-travel",
] as const;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { pages } = await getCatalog();
  const page = pages.find((item) => item.slug === slug);
  if (!page) return {};
  return { title: page.title, alternates: { canonical: canonical(page.path) } };
}

export default async function TrustPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!slugs.includes(slug as (typeof slugs)[number])) notFound();
  const { pages } = await getCatalog();
  const page = pages.find((item) => item.slug === slug);
  if (!page) notFound();
  const t = await getTranslations("trust");
  return (
    <SimplePage title={page.title} path={page.path}>
      {slug === "safety-and-rescue" ? (
        <>
          <Heading as="h2">{t("rescuePolicy")}</Heading>
          <Paragraphs text={page.body} />
        </>
      ) : (
        <Paragraphs text={page.body} />
      )}
    </SimplePage>
  );
}
