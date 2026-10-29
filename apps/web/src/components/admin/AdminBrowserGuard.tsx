"use client";

import { useEffect, useState } from "react";

function isAppWindow(): boolean {
  if (typeof window === "undefined") return false;
  const modes = ["standalone", "minimal-ui", "fullscreen"] as const;
  if (modes.some((mode) => window.matchMedia(`(display-mode: ${mode})`).matches)) {
    return true;
  }
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true;
}

async function clearStaffWorkersAndCaches() {
  if ("serviceWorker" in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map((reg) => reg.unregister()));
  }
  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => key.startsWith("ok-offline"))
        .map((key) => caches.delete(key)),
    );
  }
}

/** Staff admin must stay a normal browser tab. Unregister workers and block PWA shells. */
export function AdminBrowserGuard() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const blockInstall = (event: Event) => {
      event.preventDefault();
    };
    window.addEventListener("beforeinstallprompt", blockInstall);

    void clearStaffWorkersAndCaches();
    if (isAppWindow()) setBlocked(true);

    return () => window.removeEventListener("beforeinstallprompt", blockInstall);
  }, []);

  if (!blocked) return null;

  return (
    <div
      data-testid="admin-pwa-blocked"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#f4efe6",
        color: "#121826",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ maxWidth: "36rem" }}>
        <p
          style={{
            letterSpacing: "0.08em",
            fontSize: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          OutdoorKing staff
        </p>
        <h1 style={{ fontSize: "2rem", lineHeight: 1.15, margin: "0.75rem 0" }}>
          Open the admin in a Chrome tab
        </h1>
        <p style={{ lineHeight: 1.5 }}>
          This window is an old OutdoorKing install or an in-app preview — not a normal
          browser tab. Staff admin only works when the address bar shows the URL.
        </p>
        <ol style={{ lineHeight: 1.55, paddingLeft: "1.25rem" }}>
          <li>
            Edge: open <code>edge://apps</code> → search OutdoorKing → Uninstall.
          </li>
          <li>
            Chrome: open <code>chrome://apps</code>, use the search box for OutdoorKing
            or OK → Uninstall. Also check the Start menu and Windows Settings → Apps for
            “OutdoorKing”.
          </li>
          <li>
            Cursor: do not use Simple Browser / embedded preview. Paste{" "}
            <a href="https://outdoorking-seven.vercel.app/admin">
              https://outdoorking-seven.vercel.app/admin
            </a>{" "}
            into a real Chrome address bar.
          </li>
        </ol>
      </div>
    </div>
  );
}
