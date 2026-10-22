"use client";

import { useEffect } from "react";

import { AFFILIATE_COOKIE, normalizePartnerCode } from "@/lib/affiliate";

export function RefCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("ref") ?? params.get("affiliate");
    if (!raw) return;
    const code = normalizePartnerCode(raw);
    if (!code) return;
    const maxAge = 60 * 60 * 24 * 90;
    document.cookie = `${AFFILIATE_COOKIE}=${encodeURIComponent(code)}; path=/; max-age=${String(maxAge)}; samesite=lax`;
  }, []);
  return null;
}
