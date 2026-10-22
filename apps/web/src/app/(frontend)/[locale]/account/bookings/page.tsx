import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { loadPortal } from "@/app/(frontend)/actions/booking";
import { LoginForm } from "@/components/quote/LoginForm";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your bookings",
  robots: { index: false, follow: false },
  alternates: { canonical: canonical("/account/bookings") },
};

export default async function BookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const portal = await loadPortal();

  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">Your bookings</Heading>
          {!portal.ok ? (
            <>
              <Text className="mt-4">
                Sign in to see itinerary, documents and deposits.
              </Text>
              <div className="mt-8">
                <LoginForm callbackURL="/account/bookings" />
              </div>
            </>
          ) : portal.bookings.length === 0 ? (
            <Text className="mt-4">
              No bookings yet. Accept a private quote to open a deposit schedule.
            </Text>
          ) : (
            <ul className="mt-8 grid gap-4">
              {portal.bookings.map((booking) => (
                <li key={booking.id} className="rounded-md border border-border p-4">
                  <a
                    className="font-semibold underline"
                    href={`/account/bookings/${booking.id}`}
                  >
                    {booking.number}
                  </a>
                  <p className="text-small text-muted-foreground">
                    {booking.status}
                    {booking.startDate ? ` · ${booking.startDate}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </main>
  );
}
