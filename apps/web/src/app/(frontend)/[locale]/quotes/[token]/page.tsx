import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { loadPublicQuote } from "@/app/(frontend)/actions/quote";
import { DecideQuoteForm } from "@/components/quote/DecideQuoteForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("portal");
  return {
    title: t("quoteMeta"),
    robots: { index: false, follow: false },
  };
}

export default async function PublicQuotePage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  setRequestLocale(locale);
  const data = await loadPublicQuote(token);
  if (!data) notFound();
  const { quote, request } = data;
  const snapshot = quote.itinerarySnapshot as {
    narrative?: string;
    days?: { dayNumber: number; title?: string; sleepAltitudeM?: number }[];
  };
  const open = quote.status === "sent";
  const t = await getTranslations("portal");

  return (
    <main id="content">
      <Section>
        <Container className="grid gap-6">
          <Heading as="h1">{t("quoteTitle", { number: quote.number })}</Heading>
          <Text>{t("quoteFor", { name: request?.name ?? t("you") })}</Text>
          {snapshot.narrative ? <Text>{snapshot.narrative}</Text> : null}
          {snapshot.days?.length ? (
            <ol className="grid gap-2">
              {snapshot.days.map((day) => (
                <li key={day.dayNumber} className="rounded-md border border-border p-3">
                  {t("day", { day: day.dayNumber, title: day.title ?? "" })}
                  {day.sleepAltitudeM ? t("sleep", { height: day.sleepAltitudeM }) : ""}
                </li>
              ))}
            </ol>
          ) : null}
          <ul className="grid gap-2">
            {quote.lines.map((line) => (
              <li key={line.id}>
                {line.description}: {line.currency} {line.amount}
              </li>
            ))}
          </ul>
          <p className="font-semibold">
            {t("total", {
              currency: quote.currency,
              amount: quote.total,
              date: quote.validUntil,
            })}
          </p>
          <p className="text-small text-muted-foreground">
            {t("status", { status: quote.status })}
          </p>
          {open ? <DecideQuoteForm token={token} /> : null}
        </Container>
      </Section>
    </main>
  );
}
