import { Heading, Text } from "@ok/ui";

import { loadPipeline, loadStaffContext } from "@/app/(frontend)/actions/desk";

import { quotesHref } from "./paths";

export async function PipelineScreen() {
  const ctx = await loadStaffContext();
  if (!ctx.ok) return null;
  const desk = await loadPipeline();

  return (
    <>
      <Heading as="h1">Quote desk</Heading>
      {!ctx.canLeads ? (
        <Text className="mt-4">
          This role cannot open the CRM pipeline. Use AI writing tools if you edit
          content, or ask an admin for sales access.
        </Text>
      ) : desk.rows.length === 0 ? (
        <Text className="mt-4">No trip requests yet.</Text>
      ) : (
        <ul className="mt-8 grid gap-3">
          {desk.rows.map((row) => (
            <li key={row.id} className="rounded-md border border-border p-4">
              <a className="font-semibold underline" href={quotesHref(row.id)}>
                {row.name} · {row.tripSlug ?? "custom"}
              </a>
              <p className="text-small text-muted-foreground">
                {row.status} · {row.email}
                {row.affiliateCode ? ` · ref ${row.affiliateCode}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
