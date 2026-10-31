import { Heading } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getCatalog } from "@/content/store";
import { withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "permits" });
  return { title: t("title"), alternates: { canonical: canonical("/permits") } };
}

export default async function PermitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("permits");
  const { getPage, permits } = await getCatalog();
  const page = getPage("nepal-trekking-permits");
  const kindOf = (slug: string) =>
    slug.endsWith("-rap")
      ? "restricted"
      : slug.includes("national-park") ||
          slug.includes("conservation") ||
          slug === "acap" ||
          slug === "mcap"
        ? "parks"
        : slug.startsWith("nma-") || slug.startsWith("dot-")
          ? "climbing"
          : slug === "tims" || slug === "khumbu-trek-card"
            ? "trekking"
            : "other";
  const groups = [
    { kind: "trekking" },
    { kind: "parks" },
    { kind: "restricted" },
    { kind: "climbing" },
    { kind: "other" },
  ].map((group) => ({
    title: t(`group.${group.kind}`),
    permits: permits.filter((permit) => kindOf(permit.slug) === group.kind),
  }));
  return (
    <SimplePage
      title={page?.title ?? t("title")}
      path="/permits"
      eyebrow={t("eyebrow")}
      lead={t("lead")}
    >
      <Paragraphs text={page?.body ?? ""} />
      {groups.map((group) =>
        group.permits.length > 0 ? (
          <section key={group.title} className="mt-6 grid gap-4">
            <Heading as="h2">{group.title}</Heading>
            <ul className="grid gap-4 sm:grid-cols-2">
              {group.permits.map((permit) => (
                <li key={permit.slug}>
                  <a
                    href={`/permits/${permit.slug}`}
                    className="block h-full rounded-xl border border-border bg-surface p-5 shadow-1 transition-shadow hover:shadow-2"
                  >
                    <span className="block font-semibold">{permit.name}</span>
                    {permit.authority ? (
                      <span className="mt-1 block text-small text-muted-foreground">
                        {t("issuedBy", { authority: permit.authority })}
                      </span>
                    ) : null}
                    {permit.notes ? (
                      <span className="mt-2 line-clamp-3 text-small text-muted-foreground">
                        {withoutPlaceholders(permit.notes).split("\n")[0]}
                      </span>
                    ) : null}
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
