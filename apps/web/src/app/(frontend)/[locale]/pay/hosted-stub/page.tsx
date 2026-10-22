import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Hosted page stub",
  robots: { index: false, follow: false },
};

export default async function HostedStubPage({
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
          <Heading as="h1">Nepal bank hosted page (stub)</Heading>
          <Text className="mt-4">
            HBL/Cybersource or Nabil/2C2P would collect the card here. OutdoorKing never
            sees card data. Complete payment on the bank site; we wait for a signed
            webhook.
          </Text>
        </Container>
      </Section>
    </main>
  );
}
