import { Heading, Text } from "@ok/ui";

import { loadAnalyticsDashboard, loadStaffContext } from "@/app/(frontend)/actions/desk";

export async function AnalyticsScreen() {
  const ctx = await loadStaffContext();
  if (!ctx.ok) return null;
  const dash = await loadAnalyticsDashboard();

  return (
    <>
      <Heading as="h1">Analytics</Heading>
      {!dash.ok ? (
        <Text className="mt-4">This role cannot open analytics.</Text>
      ) : (
        <div className="mt-8 grid gap-6">
          <Text>
            Counts come from trip requests, quotes, bookings and AI usage tables. Intel
            commentary falls back to mock when the service is down.
          </Text>
          <ul className="grid gap-3 md:grid-cols-3">
            <li className="rounded-md border border-border p-4">
              Requests {dash.summary.requests}
            </li>
            <li className="rounded-md border border-border p-4">
              Quotes {dash.summary.quotes} · sent {dash.summary.quotesSent}
            </li>
            <li className="rounded-md border border-border p-4">
              Conversion{" "}
              {dash.canFinance
                ? `${String(Math.round(dash.summary.conversionRate * 100))}%`
                : "hidden"}
            </li>
            <li className="rounded-md border border-border p-4">
              Bookings {dash.summary.bookings}
            </li>
            <li className="rounded-md border border-border p-4">
              Source {dash.summary.source}
            </li>
          </ul>
          <p className="text-small text-muted-foreground">{dash.summary.commentary}</p>
          <section>
            <Heading as="h2">AI usage</Heading>
            <ul className="mt-4 grid gap-2">
              {dash.summary.aiUsage.length === 0 ? (
                <li>No AI usage recorded in this process yet.</li>
              ) : (
                dash.summary.aiUsage.map((row) => (
                  <li key={row.alias}>
                    {row.alias}: {String(row.calls)} calls
                    {dash.canFinance
                      ? ` · ${String(row.tokens)} tokens · $${String(row.costUsd)}`
                      : ""}
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      )}
    </>
  );
}
