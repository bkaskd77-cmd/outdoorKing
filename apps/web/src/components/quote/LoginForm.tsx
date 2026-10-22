"use client";

import { Button, Input, Label } from "@ok/ui";
import { useState, type FormEvent } from "react";

import { authClient } from "@/auth-client";

export function LoginForm({ callbackURL = "/account" }: { callbackURL?: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await authClient.signIn.magicLink({ email, callbackURL });
      if (result.error) {
        setError(result.error.message ?? "Could not send a sign-in link.");
        return;
      }
      setSent(true);
    } catch {
      setError("Could not send a sign-in link.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <p role="status">
        If that inbox can receive mail, a magic link is on the way. It signs you into your
        private quote inbox — not a public price list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-md gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      {error ? (
        <p role="alert" className="text-small text-prayer-red">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Email me a sign-in link"}
      </Button>
    </form>
  );
}
