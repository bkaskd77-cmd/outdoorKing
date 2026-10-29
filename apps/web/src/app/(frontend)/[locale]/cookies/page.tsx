import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookies",
  alternates: { canonical: canonical("/cookies") },
};

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = (await getCatalog()).getPage("cookies");
  return (
    <SimplePage title="Cookies" path="/cookies">
      <Paragraphs text={page?.body ?? ""} />
    </SimplePage>
  );
}
