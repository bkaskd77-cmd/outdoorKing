import { Heading } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { SimplePage } from "@/components/marketing/SimplePage";
import { type GuideView, guideGroupName, guidesOf } from "@/content/guides";
import { getCatalog } from "@/content/store";
import { withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nepal travel guides",
  description:
    "Plan your trek in Nepal: when to go, how to choose a route, visas, teahouses, altitude, fitness and your first trekking peak.",
  alternates: { canonical: canonical("/guides") },
};

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const guides = guidesOf((await getCatalog()).pages);
  const groups = (Object.keys(guideGroupName) as GuideView["group"][]).map((group) => ({
    title: guideGroupName[group],
    guides: guides.filter((guide) => guide.group === group),
  }));
  return (
    <SimplePage
      title="Nepal travel guides"
      path="/guides"
      eyebrow="Before you go"
      lead="Practical advice for planning a trek in Nepal, from choosing a route to your first night in a teahouse."
    >
      {groups.map((group) =>
        group.guides.length > 0 ? (
          <section key={group.title} className="mt-6 grid gap-4 first:mt-0">
            <Heading as="h2">{group.title}</Heading>
            <ul className="grid gap-4 sm:grid-cols-2">
              {group.guides.map((guide) => (
                <li key={guide.slug}>
                  <a
                    href={guide.path}
                    className="block h-full rounded-xl border border-border bg-surface p-5 shadow-1 transition-shadow hover:shadow-2"
                  >
                    <span className="block font-semibold">{guide.title}</span>
                    <span className="mt-2 line-clamp-3 text-small text-muted-foreground">
                      {withoutPlaceholders(guide.summary)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null,
      )}
    </SimplePage>
  );
}
