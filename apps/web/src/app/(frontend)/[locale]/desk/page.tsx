import { Heading, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { loadPipeline, loadStaffContext } from "@/app/(frontend)/actions/desk";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quote desk",
  robots: { index: false, follow: false },
  alternates: { canonical: canonical("/desk") },
};

export default async function DeskPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
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
              <a className="font-semibold underline" href={`/desk/${row.id}`}>
                {row.name} · {row.tripSlug ?? "custom"}
              </a>
              <p className="text-small text-muted-foreground">
                {row.status} · {row.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
