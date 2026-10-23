import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { loadPortalBooking } from "@/app/(frontend)/actions/booking";

import { InsuranceForm } from "./InsuranceForm";

export const metadata: Metadata = {
  title: "Booking portal",
  robots: { index: false, follow: false },
};

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const booking = await loadPortalBooking(id);
  if (!booking) notFound();
  const days = (
    booking.itinerary as {
      days?: { dayNumber: number; title?: string; sleepAltitudeM?: number }[];
      narrative?: string;
    }
  ).days;
  const narrative = (booking.itinerary as { narrative?: string }).narrative;

  return (
    <main id="content">
      <Section>
        <Container className="grid gap-8">
          <div>
            <Heading as="h1">{booking.number}</Heading>
            <Text className="mt-2">
              {booking.status} · {booking.tripSlug ?? "custom"} · {booking.startDate}–
              {booking.endDate}
            </Text>
          </div>
          <section>
            <Heading as="h2">Itinerary</Heading>
            {narrative ? <Text className="mt-2">{narrative}</Text> : null}
            {days?.length ? (
              <ol className="mt-4 grid gap-2">
                {days.map((day) => (
                  <li key={day.dayNumber} className="rounded-md border border-border p-3">
                    Day {day.dayNumber}: {day.title ?? ""}
                    {day.sleepAltitudeM ? ` · sleep ${String(day.sleepAltitudeM)} m` : ""}
                  </li>
                ))}
              </ol>
            ) : (
              <Text className="mt-2">
                Itinerary snapshot will appear after specialist send.
              </Text>
            )}
          </section>
          <section>
            <Heading as="h2">Payment schedule</Heading>
            <Text className="mt-2">From your private quote only.</Text>
            <ul className="mt-4 grid gap-2">
              {booking.payments.map((payment) => (
                <li key={payment.id} className="rounded-md border border-border p-3">
                  <p>
                    {payment.kind}: {payment.currency} {payment.amount} · {payment.status}
                  </p>
                  {payment.dueAt ? (
                    <p className="text-small text-muted-foreground">
                      Due {payment.dueAt}
                    </p>
                  ) : null}
                  {payment.redirectUrl && payment.status !== "captured" ? (
                    <a className="text-small underline" href={payment.redirectUrl}>
                      Pay on hosted page
                    </a>
                  ) : null}
                  {payment.instructions ? (
                    <p className="mt-2 text-small">
                      Wire {payment.instructions.bankName} ·{" "}
                      {payment.instructions.account} · ref{" "}
                      {payment.instructions.reference}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <Heading as="h2">Documents checklist</Heading>
            <ul className="mt-4 grid gap-2">
              {booking.documents.map((doc) => (
                <li key={doc.id}>
                  {doc.kind}: {doc.status}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <Heading as="h2">Insurance</Heading>
            <p className="mt-2 text-small">
              {booking.insurance.provider
                ? `Provider on file: ${booking.insurance.provider}`
                : "Add the insurer that covers helicopter rescue to your max altitude."}
            </p>
            <div className="mt-4">
              <InsuranceForm bookingId={booking.id} />
            </div>
          </section>
          <section>
            <Heading as="h2">Permit status</Heading>
            {booking.permitStatus.length === 0 ? (
              <Text className="mt-2">
                Permits will be listed once operations attach them.
              </Text>
            ) : (
              <ul className="mt-4 grid gap-2">
                {booking.permitStatus.map((item) => (
                  <li key={item.slug}>
                    {item.name}: {item.status}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </Container>
      </Section>
    </main>
  );
}
