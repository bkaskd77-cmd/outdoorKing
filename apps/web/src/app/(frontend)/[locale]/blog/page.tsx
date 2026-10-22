import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  alternates: { canonical: canonical("/blog") },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">Journal</Heading>
          <Text className="mt-4">
            Seasonal posts will appear here after human review. Nothing is auto-published
            by content agents.
          </Text>
        </Container>
      </Section>
    </main>
  );
}
