"use client";

import { brandName } from "@ok/config";
import { useEffect, useState, type FormEvent } from "react";

type Mode = "checking" | "signin" | "register";

export function LoginView() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("checking");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { authClient } = await import("../../auth-client");
      const session = await authClient.getSession();
      if (cancelled) return;
      const user = session.data?.user as { hasPasskey?: boolean } | undefined;
      if (!user) {
        setMode("signin");
        return;
      }
      if (user.hasPasskey) {
        window.location.href = "/admin";
        return;
      }
      setMode("register");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function sendMagicLink(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const res = await fetch("/api/auth/sign-in/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, callbackURL: "/admin/login" }),
    });
    setMessage(
      res.ok
        ? "If this address is invited, a sign-in link is on its way."
        : "Unable to send a sign-in link.",
    );
  }

  async function passkey() {
    setMessage(null);
    const { authClient } = await import("../../auth-client");
    try {
      await authClient.signIn.passkey();
      window.location.href = "/admin";
    } catch {
      setMessage(
        "Passkey sign-in failed. Use the magic link for first login, then register a passkey.",
      );
    }
  }

  async function registerPasskey() {
    setMessage(null);
    const { authClient } = await import("../../auth-client");
    try {
      const result = await authClient.passkey.addPasskey({ name: `${brandName} staff` });
      if (result?.error) {
        const text = result.error.message ?? "Passkey registration failed.";
        if (/exist|already|registered/i.test(text)) {
          window.location.href = "/admin";
          return;
        }
        setMessage(text);
        return;
      }
      window.location.href = "/admin";
    } catch {
      setMessage("Passkey registration failed. Try again on this browser.");
    }
  }

  if (mode === "checking") {
    return (
      <main className="ok-staff-login">
        <h1 className="font-display text-h2">{brandName} staff</h1>
        <p>Checking your staff session.</p>
      </main>
    );
  }

  if (mode === "register") {
    return (
      <main className="ok-staff-login">
        <h1 className="font-display text-h2">{brandName} staff</h1>
        <p>Your invite is signed in. Register a passkey to open the admin and quotes.</p>
        <button
          className="h-11 rounded-md bg-primary text-primary-foreground"
          type="button"
          onClick={() => void registerPasskey()}
        >
          Register a passkey
        </button>
        {message ? <p role="status">{message}</p> : null}
      </main>
    );
  }

  return (
    <main className="ok-staff-login">
      <h1 className="font-display text-h2">{brandName} staff</h1>
      <p>
        Staff access is invite-only. First login uses a magic link; a passkey is required
        before the admin unlocks.
      </p>
      <form onSubmit={sendMagicLink} className="grid gap-3">
        <label className="grid gap-1">
          Email
          <input
            type="email"
            required
            autoComplete="username"
            className="h-11 rounded-sm border px-3"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button
          className="h-11 rounded-md bg-primary text-primary-foreground"
          type="submit"
        >
          Email me a sign-in link
        </button>
      </form>
      <button
        className="h-11 rounded-md border"
        type="button"
        onClick={() => void passkey()}
      >
        Continue with a passkey
      </button>
      {message ? <p role="status">{message}</p> : null}
    </main>
  );
}
