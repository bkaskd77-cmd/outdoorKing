import { Container, Heading, Section } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/catalog";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  alternates: { canonical: canonical("/faq") },
};

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main id="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <Section>
        <Container>
          <Heading as="h1">FAQ</Heading>
          <dl className="mt-8 grid gap-6">
            {faqs.map((faq) => (
              <div key={faq.slug}>
                <dt className="font-semibold">{faq.question}</dt>
                <dd className="mt-2 text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
    </main>
  );
}
