import { Heading, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { loadBookingPipeline, loadStaffContext } from "@/app/(frontend)/actions/desk";

export const metadata: Metadata = {
  title: "Bookings",
  robots: { index: false, follow: false },
};

export default async function DeskBookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ctx = await loadStaffContext();
  if (!ctx.ok) return null;
  const desk = await loadBookingPipeline();

  return (
    <>
      <Heading as="h1">Bookings</Heading>
      {!desk.ok ? (
        <Text className="mt-4">This role cannot open bookings.</Text>
      ) : desk.rows.length === 0 ? (
        <Text className="mt-4">No bookings yet.</Text>
      ) : (
        <ul className="mt-8 grid gap-3">
          {desk.rows.map((row) => (
            <li key={row.id} className="rounded-md border border-border p-4">
              <p className="font-semibold">
                {row.number} · {row.name} · {row.tripSlug ?? "custom"}
              </p>
              <p className="text-small text-muted-foreground">
                {row.status}
                {row.startDate ? ` · ${row.startDate}` : ""}
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
