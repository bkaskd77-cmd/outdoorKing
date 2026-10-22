import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { getPayment, getPaymentByProviderRef } from "@/lib/booking-store";

import { MockCaptureButton } from "./MockCaptureButton";

export const metadata: Metadata = {
  title: "Mock deposit",
  robots: { index: false, follow: false },
};

export default async function MockPayPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ paymentId?: string; ref?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const payment =
    (query.paymentId ? getPayment(query.paymentId) : undefined) ??
    (query.ref ? getPaymentByProviderRef(query.ref) : undefined);

  return (
    <main id="content">
      <Section>
        <Container className="grid gap-4">
          <Heading as="h1">Sandbox hosted page</Heading>
          <Text>
            This is the mock Nepal hosted-page stand-in. No card data is collected.
            Capture is applied only through a verified webhook.
          </Text>
          {payment ? (
            <>
              <p className="text-small">
                {payment.kind} {payment.currency} {payment.amount} · {payment.status}
              </p>
              {payment.status === "captured" ? (
                <p role="status">
                  Deposit captured. Your booking is confirmed.{" "}
                  <a className="underline" href="/account/bookings">
                    Open the portal
                  </a>
                  .
                </p>
              ) : (
                <MockCaptureButton paymentId={payment.id} />
              )}
            </>
          ) : (
            <p>Payment not found. Start from an accepted private quote.</p>
          )}
        </Container>
      </Section>
    </main>
  );
}
