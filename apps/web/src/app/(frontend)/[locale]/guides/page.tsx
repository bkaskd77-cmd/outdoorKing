import { Heading } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuideCard } from "@/components/marketing/GuideCard";
import { SimplePage } from "@/components/marketing/SimplePage";
import { type GuideView, guideGroupName, guidesOf } from "@/content/guides";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: { canonical: canonical("/guides") },
  };
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides");
  const guides = guidesOf((await getCatalog()).pages);
  const groups = (Object.keys(guideGroupName) as GuideView["group"][]).map((group) => ({
    title: t(`group.${group}`),
    guides: guides.filter((guide) => guide.group === group),
  }));
  return (
    <SimplePage title={t("title")} path="/guides" eyebrow={t("eyebrow")} lead={t("lead")}>
      {groups.map((group) =>
        group.guides.length > 0 ? (
          <section key={group.title} className="mt-6 grid gap-4 first:mt-0">
            <Heading as="h2">{group.title}</Heading>
            <ul className="grid gap-4 sm:grid-cols-2">
              {group.guides.map((guide) => (
                <li key={guide.slug}>
                  <GuideCard guide={guide} />
                </li>
              ))}
            </ul>
          </section>
        ) : null,
      )}
    </SimplePage>
  );
}
