"use client";

import { brandName } from "@ok/config";
import { useState } from "react";

export function LoginView() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function sendMagicLink(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);
    const res = await fetch("/api/auth/sign-in/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, callbackURL: "/admin" }),
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

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
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
