import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LoginForm } from "@/components/quote/LoginForm";
import { canonical } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("portal");
  return {
    title: t("signInMeta"),
    robots: { index: false, follow: false },
    alternates: { canonical: canonical("/account/login") },
  };
}

export default async function AccountLoginPage({
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
          <Heading as="h1">{t("signInTitle")}</Heading>
          <Text className="mt-4">{t("signInBody")}</Text>
          <div className="mt-8">
            <LoginForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
