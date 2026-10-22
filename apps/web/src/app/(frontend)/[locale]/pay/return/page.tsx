import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Payment return",
  robots: { index: false, follow: false },
};

export default async function PayReturnPage({
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
          <Heading as="h1">Returned from the bank</Heading>
          <Text className="mt-4">
            This page does not mark a payment paid. Capture happens only after a verified
            webhook or a finance wire confirmation. Check your{" "}
            <a className="underline" href="/account/bookings">
              booking portal
            </a>
            .
          </Text>
        </Container>
      </Section>
    </main>
  );
}
