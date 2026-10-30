import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

const slugs = [
  "acclimatization-explained",
  "best-time-to-trek",
  "nepal-trekking-packing-list",
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
  const page = pages.find((item) => item.path.endsWith(slug) || item.slug === slug);
  if (!page) return {};
  return { title: page.title, alternates: { canonical: canonical(page.path) } };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { pages } = await getCatalog();
  const page = pages.find((item) => item.slug === slug || item.path.endsWith(slug));
  if (!page) notFound();
  return (
    <SimplePage title={page.title} path={page.path}>
      <Paragraphs text={page.body} />
    </SimplePage>
  );
}
