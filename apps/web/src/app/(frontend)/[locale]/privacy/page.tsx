import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: canonical("/privacy") },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = (await getCatalog()).getPage("privacy");
  return (
    <SimplePage title="Privacy" path="/privacy">
      <Paragraphs text={page?.body ?? ""} />
    </SimplePage>
  );
}
