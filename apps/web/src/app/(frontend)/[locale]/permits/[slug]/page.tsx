import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

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

function checkedOn(date: string): string | null {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-GB", {
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
  const checked = checkedOn(permit.lastVerifiedAt);

  return (
    <SimplePage
      title={permit.name}
      path={`/permits/${permit.slug}`}
      eyebrow="Permits"
      lead={permit.authority ? `Issued by ${permit.authority}.` : undefined}
      aside={
        <>
          <InfoCard title="At a glance">
            {permit.authority ? <p>{`Issued by ${permit.authority}`}</p> : null}
            <p>
              {permit.requiresLicensedGuide
                ? "Needs a licensed guide and a registered agency"
                : "Arranged with your other permits"}
            </p>
            <p>We apply and pay for it as part of your trip.</p>
            {checked ? <p>{`Information last checked ${checked}`}</p> : null}
          </InfoCard>
          {trips.length > 0 ? (
            <InfoCard title="Trips that need it">
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
          All Nepal trekking permits
        </a>
      </p>
    </SimplePage>
  );
}
