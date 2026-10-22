import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getPage } from "@/content/catalog";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  alternates: { canonical: canonical("/team") },
};

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage("team");
  return (
    <SimplePage title="Team" path="/team">
      <Paragraphs text={page?.body ?? ""} />
    </SimplePage>
  );
}
