"use client";

import { useState } from "react";

type StaffSignOutProps = {
  loginHref?: string;
};

export function StaffSignOut({ loginHref = "/admin/login" }: StaffSignOutProps) {
  const [busy, setBusy] = useState(false);

  async function signOut() {
    if (busy) return;
    setBusy(true);
    try {
      const { authClient } = await import("../../auth-client");
      await authClient.signOut();
    } catch {
      // Still clear via the HTTP endpoint if the client call fails.
      try {
        await fetch("/api/auth/sign-out", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}",
          credentials: "include",
        });
      } catch {
        // Fall through to login redirect either way.
      }
    }
    window.location.assign(loginHref);
  }

  return (
    <button
      type="button"
      className="ok-staff-signout"
      disabled={busy}
      onClick={() => void signOut()}
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
