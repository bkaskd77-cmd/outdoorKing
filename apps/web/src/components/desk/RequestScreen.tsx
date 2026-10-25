import { Heading, Text } from "@ok/ui";
import { notFound } from "next/navigation";

import { loadDeskRequest } from "@/app/(frontend)/actions/quote";
import { SendQuoteForm } from "@/components/quote/SendQuoteForm";
import { StaffIntelPanel } from "@/components/quote/StaffIntelPanel";

export async function RequestScreen({ id }: { id: string }) {
  const data = await loadDeskRequest(id);
  if (!data) notFound();
  const { request, draft, quotes, canFinance, canSend } = data;
  const days = draft?.result.resolvedDays ?? [];

  return (
    <>
      <Heading as="h1">Review {request.name}</Heading>
      <Text className="mt-4">
        {request.email} · {request.tripSlug ?? "custom"} · {request.status}
        {request.affiliateCode ? ` · ref ${request.affiliateCode}` : ""}
      </Text>
      <p className="mt-2 text-small text-muted-foreground">
        {request.party.adults} adults · {request.dates.durationDays} days ·{" "}
        {request.preferences.comfort} · {request.party.fitness}
      </p>
      {draft ? (
        <section className="mt-8">
          <Heading as="h2">AI itinerary draft</Heading>
          <p className="mt-2 text-small">
            {draft.result.draft.narrative}{" "}
            {draft.result.mocked ? "(catalog mock path)" : ""}
          </p>
          {(draft.result.planReasons ?? []).length > 0 ? (
            <div className="mt-4">
              <Heading as="h3">Why this plan</Heading>
              <ul className="mt-2 grid gap-2 text-small">
                {(draft.result.planReasons ?? []).map((item) => (
                  <li key={`${item.id}-${item.text}`}>
                    {item.text.replace(/\b(?:ALT|LOG|PRM)-\d{3}\b:?\s*/g, "").trim()}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <ol className="mt-4 grid gap-2">
            {days.map((day) => (
              <li key={day.dayNumber} className="rounded-md border border-border p-3">
                Day {day.dayNumber}: {day.title} · sleep {day.sleepAltitudeM} m
              </li>
            ))}
          </ol>
          {draft.result.report.violations.length > 0 ? (
            <ul className="mt-4 text-small text-prayer-red">
              {draft.result.report.violations.map((item) => (
                <li key={item.id}>
                  {item.id}: {item.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-small">Rule engine: no remaining errors.</p>
          )}
        </section>
      ) : (
        <Text className="mt-8">No AI draft on this request yet.</Text>
      )}
      {quotes.length > 0 ? (
        <ul className="mt-6 text-small">
          {quotes.map((quote) => (
            <li key={quote.id}>
              {quote.number} · {quote.status}
              {canFinance && quote.total !== null
                ? ` · ${quote.currency} ${String(quote.total)}`
                : " · amount hidden"}
            </li>
          ))}
        </ul>
      ) : null}
      {canFinance ? <StaffIntelPanel tripSlug={request.tripSlug} /> : null}
      {canSend ? (
        <section className="mt-8">
          <Heading as="h2">Send private quote</Heading>
          <Text className="mt-2">
            Amounts stay off trip pages. The customer receives a tokenized link.
          </Text>
          <div className="mt-4">
            <SendQuoteForm requestId={request.id} />
          </div>
        </section>
      ) : null}
    </>
  );
}
