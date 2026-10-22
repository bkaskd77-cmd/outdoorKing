import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LoginForm } from "@/components/quote/LoginForm";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
  alternates: { canonical: canonical("/account/login") },
};

export default async function AccountLoginPage({
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
          <Heading as="h1">Sign in</Heading>
          <Text className="mt-4">
            Customers use a magic link. Staff with an invite can also open the quote desk
            after signing in.
          </Text>
          <div className="mt-8">
            <LoginForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
