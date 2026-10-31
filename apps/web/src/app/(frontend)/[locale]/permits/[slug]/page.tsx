import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InfoCard, Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { getCatalog } from "@/content/store";
import { withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

export async function generateStaticParams() {
  const { permits } = await getCatalog();
  return permits.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const permit = (await getCatalog()).getPermit(slug);
  if (!permit) return {};
  return {
    title: permit.name,
    description: withoutPlaceholders(permit.notes).split("\n")[0],
    alternates: { canonical: canonical(`/permits/${permit.slug}`) },
  };
}

function checkedOn(date: string, locale: string): string | null {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString(locale === "en" ? "en-GB" : locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function PermitPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { getPermit, getTrips } = await getCatalog();
  const permit = getPermit(slug);
  if (!permit) notFound();
  const trips = getTrips("published").filter((trip) =>
    trip.permits.includes(permit.slug),
  );
  const t = await getTranslations("permits");
  const checked = checkedOn(permit.lastVerifiedAt, locale);

  return (
    <SimplePage
      title={permit.name}
      path={`/permits/${permit.slug}`}
      eyebrow={t("eyebrowPermit")}
      lead={
        permit.authority
          ? `${t("issuedBy", { authority: permit.authority })}.`
          : undefined
      }
      aside={
        <>
          <InfoCard title={t("atAGlance")}>
            {permit.authority ? (
              <p>{t("issuedBy", { authority: permit.authority })}</p>
            ) : null}
            <p>
              {permit.requiresLicensedGuide ? t("needsGuide") : t("arrangedWithOthers")}
            </p>
            <p>{t("wePay")}</p>
            {checked ? <p>{t("lastChecked", { date: checked })}</p> : null}
          </InfoCard>
          {trips.length > 0 ? (
            <InfoCard title={t("tripsThatNeedIt")}>
              <ul className="grid gap-1">
                {trips.map((trip) => (
                  <li key={trip.slug}>
                    <a
                      className="text-foreground underline-offset-4 hover:underline"
                      href={`/trips/${trip.slug}`}
                    >
                      {trip.title}
                    </a>
                  </li>
                ))}
              </ul>
            </InfoCard>
          ) : null}
        </>
      }
    >
      <Paragraphs text={withoutPlaceholders(permit.notes)} />
      <p className="mt-4 text-small">
        <a className="underline-offset-4 hover:underline" href="/permits">
          {t("allPermits")}
        </a>
      </p>
    </SimplePage>
  );
}
