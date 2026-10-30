import { Button } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { InfoCard, Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { companyFacts } from "@/content/catalog";
import { getCatalog } from "@/content/store";
import { isPlaceholder } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: canonical("/about") },
};

const facts: { label: string; value: string }[] = [
  { label: "Registered as", value: companyFacts.legalEntity },
  { label: "Tourism licence", value: companyFacts.licenceNo },
  { label: "Operating since", value: companyFacts.years },
  { label: "Address", value: companyFacts.address },
  { label: "Memberships", value: companyFacts.memberships },
].filter((fact) => !isPlaceholder(fact.value));

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = (await getCatalog()).getPage("about");
  return (
    <SimplePage
      title={page?.title ?? "About"}
      path="/about"
      eyebrow="OutdoorKing"
      lead="A Nepali team designing private treks, tours and climbs across the Himalaya."
      aside={
        <>
          {facts.length > 0 ? (
            <InfoCard title="Company details">
              <dl className="grid gap-2">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-caption">{fact.label}</dt>
                    <dd className="text-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </InfoCard>
          ) : null}
          <InfoCard
            title="How we work"
            action={
              <Button variant="secondary" asChild>
                <a href="/trust/licence-and-legal">Licence and legal</a>
              </Button>
            }
          >
            <p>Private groups only, licensed guides, and a safety policy you can read.</p>
            <p>
              <a
                className="underline-offset-4 hover:underline"
                href="/trust/safety-and-rescue"
              >
                Safety and rescue
              </a>
              {" · "}
              <a className="underline-offset-4 hover:underline" href="/purpose">
                Travel with Purpose
              </a>
            </p>
          </InfoCard>
        </>
      }
    >
      <Paragraphs text={page?.body ?? ""} />
    </SimplePage>
  );
}
