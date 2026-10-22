import { Container, Heading, Section, Text } from "@ok/ui";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ slug: "seasons" }];
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">{`Journal · ${slug}`}</Heading>
          <Text className="mt-4">No posts in this category yet.</Text>
        </Container>
      </Section>
    </main>
  );
}
