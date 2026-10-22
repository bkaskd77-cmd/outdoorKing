import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { loadPublicQuote } from "@/app/(frontend)/actions/quote";
import { DecideQuoteForm } from "@/components/quote/DecideQuoteForm";

export const metadata: Metadata = {
  title: "Private quote",
  robots: { index: false, follow: false },
};

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

  return (
    <main id="content">
      <Section>
        <Container className="grid gap-6">
          <Heading as="h1">Private quote {quote.number}</Heading>
          <Text>
            This link is for {request?.name ?? "you"} only. It is not a public trip price.
            Accepting opens a private deposit — never listed on trip pages.
          </Text>
          {snapshot.narrative ? <Text>{snapshot.narrative}</Text> : null}
          {snapshot.days?.length ? (
            <ol className="grid gap-2">
              {snapshot.days.map((day) => (
                <li key={day.dayNumber} className="rounded-md border border-border p-3">
                  Day {day.dayNumber}: {day.title ?? ""}
                  {day.sleepAltitudeM ? ` · sleep ${String(day.sleepAltitudeM)} m` : ""}
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
            Total {quote.currency} {quote.total} · valid until {quote.validUntil}
          </p>
          <p className="text-small text-muted-foreground">Status: {quote.status}</p>
          {open ? <DecideQuoteForm token={token} /> : null}
        </Container>
      </Section>
    </main>
  );
}
