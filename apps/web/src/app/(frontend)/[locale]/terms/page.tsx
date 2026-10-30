import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  alternates: { canonical: canonical("/terms") },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = (await getCatalog()).getPage("terms");
  return (
    <SimplePage title="Terms" path="/terms">
      <Paragraphs text={page?.body ?? ""} />
    </SimplePage>
  );
}
