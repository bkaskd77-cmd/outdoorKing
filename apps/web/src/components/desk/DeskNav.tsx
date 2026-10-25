import type { StaffContext } from "@/app/(frontend)/actions/desk";

import { quotesHref } from "./paths";

const links: { href: string; label: string; show: (ctx: StaffContext) => boolean }[] = [
  { href: quotesHref(), label: "Pipeline", show: (ctx) => ctx.canLeads },
  { href: quotesHref("quotes"), label: "Quotes", show: (ctx) => ctx.canQuotes },
  { href: quotesHref("bookings"), label: "Bookings", show: (ctx) => ctx.canBookings },
  { href: quotesHref("ops"), label: "Ops", show: (ctx) => ctx.canOps || ctx.canBookings },
  { href: quotesHref("analytics"), label: "Analytics", show: (ctx) => ctx.canAnalytics },
  { href: quotesHref("partners"), label: "Partners", show: (ctx) => ctx.canLeads },
  { href: quotesHref("ai"), label: "AI writing", show: (ctx) => ctx.canWriteContent },
];

export function DeskNav({ ctx }: { ctx: StaffContext }) {
  return (
    <nav aria-label="Quotes" className="mt-6 flex flex-wrap gap-3 text-small">
      {links
        .filter((link) => link.show(ctx))
        .map((link) => (
          <a key={link.href} className="underline" href={link.href}>
            {link.label}
          </a>
        ))}
    </nav>
  );
}
