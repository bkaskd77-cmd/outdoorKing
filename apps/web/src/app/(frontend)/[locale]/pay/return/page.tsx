import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("portal");
  return {
    title: t("returnMeta"),
    robots: { index: false, follow: false },
  };
}

export default async function PayReturnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portal");
  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">{t("returnTitle")}</Heading>
          <Text className="mt-4">
            {t.rich("returnBody", {
              link: (chunks) => (
                <a className="underline" href="/account/bookings">
                  {chunks}
                </a>
              ),
            })}
          </Text>
        </Container>
      </Section>
    </main>
  );
}
