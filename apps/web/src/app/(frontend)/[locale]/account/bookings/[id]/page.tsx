import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { loadPortalBooking } from "@/app/(frontend)/actions/booking";

import { InsuranceForm } from "./InsuranceForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("portal");
  return {
    title: t("bookingMeta"),
    robots: { index: false, follow: false },
  };
}

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
  const t = await getTranslations("portal");

  return (
    <main id="content">
      <Section>
        <Container className="grid gap-8">
          <div>
            <Heading as="h1">{booking.number}</Heading>
            <Text className="mt-2">
              {booking.status} · {booking.tripSlug ?? t("custom")} · {booking.startDate}–
              {booking.endDate}
            </Text>
          </div>
          <section>
            <Heading as="h2">{t("itinerary")}</Heading>
            {narrative ? <Text className="mt-2">{narrative}</Text> : null}
            {days?.length ? (
              <ol className="mt-4 grid gap-2">
                {days.map((day) => (
                  <li key={day.dayNumber} className="rounded-md border border-border p-3">
                    {t("day", { day: day.dayNumber, title: day.title ?? "" })}
                    {day.sleepAltitudeM ? t("sleep", { height: day.sleepAltitudeM }) : ""}
                  </li>
                ))}
              </ol>
            ) : (
              <Text className="mt-2">{t("itineraryLater")}</Text>
            )}
          </section>
          <section>
            <Heading as="h2">{t("paymentSchedule")}</Heading>
            <Text className="mt-2">{t("paymentFromQuote")}</Text>
            <ul className="mt-4 grid gap-2">
              {booking.payments.map((payment) => (
                <li key={payment.id} className="rounded-md border border-border p-3">
                  <p>
                    {payment.kind}: {payment.currency} {payment.amount} · {payment.status}
                  </p>
                  {payment.dueAt ? (
                    <p className="text-small text-muted-foreground">
                      {t("due", { date: payment.dueAt })}
                    </p>
                  ) : null}
                  {payment.redirectUrl && payment.status !== "captured" ? (
                    <a className="text-small underline" href={payment.redirectUrl}>
                      {t("payHosted")}
                    </a>
                  ) : null}
                  {payment.instructions ? (
                    <p className="mt-2 text-small">
                      {t("wire", {
                        bank: payment.instructions.bankName,
                        account: payment.instructions.account,
                        reference: payment.instructions.reference,
                      })}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <Heading as="h2">{t("documents")}</Heading>
            <ul className="mt-4 grid gap-2">
              {booking.documents.map((doc) => (
                <li key={doc.id}>
                  {doc.kind}: {doc.status}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <Heading as="h2">{t("insurance")}</Heading>
            <p className="mt-2 text-small">
              {booking.insurance.provider
                ? t("insuranceOnFile", { provider: booking.insurance.provider })
                : t("insuranceAsk")}
            </p>
            <div className="mt-4">
              <InsuranceForm bookingId={booking.id} />
            </div>
          </section>
          <section>
            <Heading as="h2">{t("permitStatus")}</Heading>
            {booking.permitStatus.length === 0 ? (
              <Text className="mt-2">{t("permitsLater")}</Text>
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
