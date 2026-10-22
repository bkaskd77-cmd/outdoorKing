import type { StaffContext } from "@/app/(frontend)/actions/desk";

const links: { href: string; label: string; show: (ctx: StaffContext) => boolean }[] = [
  { href: "/desk", label: "Pipeline", show: (ctx) => ctx.canLeads },
  { href: "/desk/quotes", label: "Quotes", show: (ctx) => ctx.canQuotes },
  { href: "/desk/bookings", label: "Bookings", show: (ctx) => ctx.canBookings },
  { href: "/desk/ops", label: "Ops", show: (ctx) => ctx.canOps || ctx.canBookings },
  { href: "/desk/analytics", label: "Analytics", show: (ctx) => ctx.canAnalytics },
  { href: "/desk/ai", label: "AI writing", show: (ctx) => ctx.canWriteContent },
];

export function DeskNav({ ctx }: { ctx: StaffContext }) {
  return (
    <nav aria-label="Staff desk" className="mt-6 flex flex-wrap gap-3 text-small">
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
