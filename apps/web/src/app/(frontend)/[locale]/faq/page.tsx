import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Heading,
} from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InfoCard, SimplePage } from "@/components/marketing/SimplePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqGroups } from "@/content/faq-groups";
import { getCatalog } from "@/content/store";
import { withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: { canonical: canonical("/faq") },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const { faqs } = await getCatalog();
  const known = new Set(faqGroups.map((group) => group.category));
  const groups = [...faqGroups, { category: "", title: "", more: undefined }].map(
    (group) => ({
      ...group,
      title: group.category ? t(`group.${group.category}.title`) : t("moreQuestions"),
      more: group.more
        ? { ...group.more, label: t(`group.${group.category}.more`) }
        : undefined,
      faqs: faqs.filter((faq) =>
        group.category ? faq.category === group.category : !known.has(faq.category),
      ),
    }),
  );

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
        title={t("title")}
        path="/faq"
        eyebrow="FAQ"
        lead={t("lead")}
        aside={
          <InfoCard title={t("onThisPage")}>
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
              {t.rich("stillAsk", {
                link: (chunks) => (
                  <a
                    className="text-foreground underline-offset-4 hover:underline"
                    href="/design-my-trip"
                  >
                    {chunks}
                  </a>
                ),
              })}
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
