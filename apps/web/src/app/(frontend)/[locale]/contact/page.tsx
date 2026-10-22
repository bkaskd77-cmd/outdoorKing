import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getPage } from "@/content/catalog";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: canonical("/contact") },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage("contact");
  return (
    <SimplePage title="Contact" path="/contact">
      <Paragraphs text={page?.body ?? ""} />
    </SimplePage>
  );
}
