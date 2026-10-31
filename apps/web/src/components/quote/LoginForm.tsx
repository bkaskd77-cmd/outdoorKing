"use client";

import { Button, Input, Label } from "@ok/ui";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

import { authClient } from "@/auth-client";

export function LoginForm({ callbackURL = "/account" }: { callbackURL?: string }) {
  const t = useTranslations("portal");
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
        setError(result.error.message ?? t("linkFailed"));
        return;
      }
      setSent(true);
    } catch {
      setError(t("linkFailed"));
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return <p role="status">{t("linkSent")}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-md gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">{t("email")}</Label>
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
        {pending ? t("sending") : t("sendLink")}
      </Button>
    </form>
  );
}
