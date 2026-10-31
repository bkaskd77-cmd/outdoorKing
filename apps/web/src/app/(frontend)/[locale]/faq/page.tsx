import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Heading,
} from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { InfoCard, SimplePage } from "@/components/marketing/SimplePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqGroups } from "@/content/faq-groups";
import { getCatalog } from "@/content/store";
import { withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions about trekking in Nepal",
  description:
    "Answers on planning, permits, visas, teahouses, altitude, safety, insurance and payments for a private trip in Nepal.",
  alternates: { canonical: canonical("/faq") },
};

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { faqs } = await getCatalog();
  const known = new Set(faqGroups.map((group) => group.category));
  const groups = [
    ...faqGroups,
    { category: "", title: "More questions", more: undefined },
  ].map((group) => ({
    ...group,
    faqs: faqs.filter((faq) =>
      group.category ? faq.category === group.category : !known.has(faq.category),
    ),
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: withoutPlaceholders(faq.answer) },
          })),
        }}
      />
      <SimplePage
        title="Questions about trekking in Nepal"
        path="/faq"
        eyebrow="FAQ"
        lead="Straight answers on planning, permits, life on the trail, altitude and safety."
        aside={
          <InfoCard title="On this page">
            <ul className="grid gap-1">
              {groups
                .filter((group) => group.faqs.length > 0)
                .map((group) => (
                  <li key={group.title}>
                    <a
                      className="text-foreground underline-offset-4 hover:underline"
                      href={`#${group.category || "more"}`}
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
            </ul>
            <p className="mt-3">
              Still have a question? Ask a trip designer when you{" "}
              <a
                className="text-foreground underline-offset-4 hover:underline"
                href="/design-my-trip"
              >
                design your trip
              </a>
              .
            </p>
          </InfoCard>
        }
      >
        {groups.map((group) =>
          group.faqs.length > 0 ? (
            <section
              key={group.title}
              id={group.category || "more"}
              className="mt-6 grid scroll-mt-[calc(var(--header-h)+1rem)] gap-3 first:mt-0"
            >
              <Heading as="h2">{group.title}</Heading>
              <Accordion type="multiple" className="border-t border-border">
                {group.faqs.map((faq) => (
                  <AccordionItem key={faq.slug} value={faq.slug}>
                    <AccordionTrigger className="py-4 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pb-2 text-muted-foreground">
                        {withoutPlaceholders(faq.answer)}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {group.more ? (
                <p className="text-small">
                  <a
                    className="underline-offset-4 hover:underline"
                    href={group.more.href}
                  >
                    {group.more.label}
                  </a>
                </p>
              ) : null}
            </section>
          ) : null,
        )}
      </SimplePage>
    </>
  );
}
