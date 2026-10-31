import { Heading, Text } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getCatalog, getTeam } from "@/content/store";
import { canonical } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return {
    title: t("title"),
    alternates: { canonical: canonical("/team") },
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");
  const [page, team] = await Promise.all([
    getCatalog().then((catalog) => catalog.getPage("team")),
    getTeam(),
  ]);
  return (
    <SimplePage
      title={page?.title ?? t("title")}
      path="/team"
      eyebrow={t("eyebrow")}
      lead={t("lead")}
    >
      {team.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2">
          {team.map((member) => (
            <li
              key={member.name}
              className="overflow-hidden rounded-xl border border-border bg-surface shadow-1"
            >
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.photoAlt ?? member.name}
                  className="aspect-4/3 w-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="p-6">
                <Heading as="h3">{member.name}</Heading>
                {member.role ? (
                  <p className="text-small text-primary">{member.role}</p>
                ) : null}
                {member.bio ? (
                  <Text className="mt-3 text-small">{member.bio}</Text>
                ) : null}
                <p className="mt-3 text-caption text-muted-foreground">
                  {[
                    member.yearsExperience
                      ? t("experience", { years: member.yearsExperience })
                      : "",
                    member.languages ? t("speaks", { languages: member.languages }) : "",
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Paragraphs text={page?.body ?? ""} />
      )}
    </SimplePage>
  );
}
