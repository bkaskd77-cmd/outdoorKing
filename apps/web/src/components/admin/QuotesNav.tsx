"use client";

import { usePathname } from "next/navigation";

import { QUOTES_ADMIN_PATH } from "@/components/desk/paths";

export function QuotesNavLink() {
  const pathname = usePathname() ?? "";
  const active = pathname.startsWith(QUOTES_ADMIN_PATH);

  return (
    <a
      href={QUOTES_ADMIN_PATH}
      className={["nav__link", "ok-quotes-link", active ? "active" : null]
        .filter(Boolean)
        .join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <span className="nav__link-label">Quotes</span>
    </a>
  );
}
