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

/** Staff admin must stay a normal browser tab. Unregister workers and block PWA shells. */
export function AdminBrowserGuard() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker
        .getRegistrations()
        .then((regs) => Promise.all(regs.map((reg) => reg.unregister())));
    }
    if (isAppWindow()) setBlocked(true);
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
      <div style={{ maxWidth: "32rem" }}>
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
          This window is an old OutdoorKing app install with no address bar. Staff admin
          only works in a normal browser tab.
        </p>
        <p style={{ lineHeight: 1.5 }}>
          In Chrome open <code>chrome://apps</code> → OutdoorKing → Uninstall. Then open{" "}
          <a href="https://outdoorking-seven.vercel.app/admin">
            outdoorking-seven.vercel.app/admin
          </a>{" "}
          in a new tab.
        </p>
      </div>
    </div>
  );
}
