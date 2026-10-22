"use client";

import { Button } from "@ok/ui";
import { useEffect, useState } from "react";

const KEY = "ok-cookie-consent";

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(window.localStorage.getItem(KEY) !== "essential");
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 z-400 max-w-sm rounded-lg border border-border bg-surface p-4 shadow-4"
    >
      <p className="text-small">
        Essential cookies only. We do not run third-party ad trackers. Analytics on Vercel
        is cookieless.
      </p>
      <Button
        className="mt-3"
        type="button"
        onClick={() => {
          window.localStorage.setItem(KEY, "essential");
          setOpen(false);
        }}
      >
        Continue with essential cookies
      </Button>
    </div>
  );
}
