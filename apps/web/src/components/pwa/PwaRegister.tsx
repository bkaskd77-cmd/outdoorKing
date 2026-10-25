"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // Cache offline trek info only. There is no install prompt, and the
    // worker does not handle /admin.
    void navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" });
  }, []);

  return (
    <span data-testid="pwa-ready" className="sr-only">
      Offline trek info is available on this site.
    </span>
  );
}
