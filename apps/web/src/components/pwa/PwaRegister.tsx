"use client";

import { useEffect } from "react";

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function PwaRegister() {
  useEffect(() => {
    const blockInstall = (event: Event) => {
      event.preventDefault();
    };
    window.addEventListener("beforeinstallprompt", blockInstall);

    if (!("serviceWorker" in navigator)) {
      return () => window.removeEventListener("beforeinstallprompt", blockInstall);
    }
    // Public offline cache only. Never register from /admin, and the worker
    // does not handle staff paths.
    if (isAdminPath(window.location.pathname)) {
      return () => window.removeEventListener("beforeinstallprompt", blockInstall);
    }
    void navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" });

    return () => window.removeEventListener("beforeinstallprompt", blockInstall);
  }, []);

  return (
    <span data-testid="pwa-ready" className="sr-only">
      Offline trek info is available on this site.
    </span>
  );
}
