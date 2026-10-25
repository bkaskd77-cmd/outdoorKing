"use client";

import { useNav } from "@payloadcms/ui";
import { useEffect, type ReactNode } from "react";

/** Payload treats every viewport under 1440px as “small” and closes the sidebar into a clipped column. */
const READABLE_NAV = 769;

export function StaffNavLock({ children }: { children?: ReactNode }) {
  const { setNavOpen } = useNav();

  useEffect(() => {
    const openIfWide = () => {
      if (window.innerWidth >= READABLE_NAV) setNavOpen(true);
    };
    openIfWide();
    const interval = window.setInterval(openIfWide, 150);
    const stop = window.setTimeout(() => window.clearInterval(interval), 2000);
    const onResize = () => {
      window.setTimeout(openIfWide, 80);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
      window.removeEventListener("resize", onResize);
    };
  }, [setNavOpen]);

  return children ?? null;
}
