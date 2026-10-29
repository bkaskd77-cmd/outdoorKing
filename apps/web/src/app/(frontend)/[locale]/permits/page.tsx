import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { getCatalog } from "@/content/store";
import { withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nepal trekking permits",
  alternates: { canonical: canonical("/permits") },
};

export default async function PermitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { getPage, permits } = await getCatalog();
  const page = getPage("nepal-trekking-permits");
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">{page?.title ?? "Permits"}</Heading>
          <Text className="mt-4">
            {page?.body ? withoutPlaceholders(page.body) : page?.body}
          </Text>
          <ul className="mt-8 grid gap-3">
            {permits.map((permit) => (
              <li key={permit.slug}>
                <a href={`/permits/${permit.slug}`}>{permit.name}</a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
