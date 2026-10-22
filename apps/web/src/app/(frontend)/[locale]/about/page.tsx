import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getPage } from "@/content/catalog";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: canonical("/about") },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage("about");
  return (
    <SimplePage title={page?.title ?? "About"} path="/about">
      <Paragraphs text={page?.body ?? ""} />
    </SimplePage>
  );
}
