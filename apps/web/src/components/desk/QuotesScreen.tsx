import { Heading, Text } from "@ok/ui";

import { loadQuotePipeline, loadStaffContext } from "@/app/(frontend)/actions/desk";

import { quotesHref } from "./paths";

export async function QuotesScreen() {
  const ctx = await loadStaffContext();
  if (!ctx.ok) return null;
  const desk = await loadQuotePipeline();

  return (
    <>
      <Heading as="h1">Quotes</Heading>
      {!desk.ok ? (
        <Text className="mt-4">This role cannot open quotes.</Text>
      ) : desk.rows.length === 0 ? (
        <Text className="mt-4">No quotes yet.</Text>
      ) : (
        <ul className="mt-8 grid gap-3">
          {desk.rows.map((row) => (
            <li key={row.id} className="rounded-md border border-border p-4">
              <a className="font-semibold underline" href={quotesHref(row.requestId)}>
                {row.number} · {row.name ?? "lead"}
              </a>
              <p className="text-small text-muted-foreground">
                {row.status}
                {desk.canFinance
                  ? ` · ${row.currency} ${String(row.total)}`
                  : " · amount hidden"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
