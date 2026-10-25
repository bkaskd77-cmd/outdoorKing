"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // Public offline cache only. Never register from /admin, and the worker
    // does not handle staff paths.
    if (
      window.location.pathname === "/admin" ||
      window.location.pathname.startsWith("/admin/")
    ) {
      return;
    }
    void navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" });
  }, []);

  return (
    <span data-testid="pwa-ready" className="sr-only">
      Offline trek info is available on this site.
    </span>
  );
}
