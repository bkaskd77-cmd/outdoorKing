import type { StaffContext } from "@/app/(frontend)/actions/desk";

import { quotesHref } from "./paths";

const links: {
  href: string;
  label: string;
  key: string;
  show: (ctx: StaffContext) => boolean;
}[] = [
  { href: quotesHref(), label: "Pipeline", key: "", show: (ctx) => ctx.canLeads },
  {
    href: quotesHref("quotes"),
    label: "Quotes",
    key: "quotes",
    show: (ctx) => ctx.canQuotes,
  },
  {
    href: quotesHref("bookings"),
    label: "Bookings",
    key: "bookings",
    show: (ctx) => ctx.canBookings,
  },
  {
    href: quotesHref("ops"),
    label: "Ops",
    key: "ops",
    show: (ctx) => ctx.canOps || ctx.canBookings,
  },
  {
    href: quotesHref("analytics"),
    label: "Analytics",
    key: "analytics",
    show: (ctx) => ctx.canAnalytics,
  },
  {
    href: quotesHref("partners"),
    label: "Partners",
    key: "partners",
    show: (ctx) => ctx.canLeads,
  },
  {
    href: quotesHref("ai"),
    label: "AI writing",
    key: "ai",
    show: (ctx) => ctx.canWriteContent,
  },
];

export function DeskNav({ ctx, active }: { ctx: StaffContext; active: string }) {
  return (
    <nav aria-label="Quotes work" className="ok-desk-switch">
      {links
        .filter((link) => link.show(ctx))
        .map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={link.key === active ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
    </nav>
  );
}
