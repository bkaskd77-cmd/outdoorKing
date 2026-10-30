import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

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
    alternates: { canonical: canonical(`/permits/${permit.slug}`) },
  };
}

export default async function PermitPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const permit = (await getCatalog()).getPermit(slug);
  if (!permit) notFound();
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">{permit.name}</Heading>
          <Text className="mt-4">{withoutPlaceholders(permit.notes)}</Text>
          <p className="mt-4 text-small">{`Authority: ${permit.authority}. Last verified ${permit.lastVerifiedAt}.`}</p>
        </Container>
      </Section>
    </main>
  );
}
