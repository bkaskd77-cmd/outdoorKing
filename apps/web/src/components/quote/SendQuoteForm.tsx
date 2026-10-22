"use client";

import { Button, Input, Label, Textarea } from "@ok/ui";
import { useState } from "react";

import { sendPrivateQuote } from "@/app/(frontend)/actions/quote";

export function SendQuoteForm({ requestId }: { requestId: string }) {
  const [error, setError] = useState("");
  const [sent, setSent] = useState<{ number: string; url: string } | null>(null);
  const [pending, setPending] = useState(false);

  async function action(formData: FormData) {
    setPending(true);
    setError("");
    const result = await sendPrivateQuote({
      requestId,
      description: String(formData.get("description") ?? ""),
      amount: Number(formData.get("amount") ?? 0),
      currency: String(formData.get("currency") ?? "USD"),
      staffNotes: String(formData.get("staffNotes") ?? "") || undefined,
    });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSent({ number: result.data.number, url: result.data.url });
  }

  if (sent) {
    return (
      <p role="status">
        Quote {sent.number} sent. Private link:{" "}
        <a className="underline" href={sent.url}>
          {sent.url}
        </a>
      </p>
    );
  }

  return (
    <form action={action} className="grid max-w-lg gap-4">
      <div className="grid gap-2">
        <Label htmlFor="description">Line description</Label>
        <Input
          id="description"
          name="description"
          required
          defaultValue="Private land package"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount">
          Amount (staff only — never published on trip pages)
        </Label>
        <Input id="amount" name="amount" type="number" min={0} step="1" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="currency">Currency</Label>
        <Input id="currency" name="currency" defaultValue="USD" maxLength={3} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="staffNotes">Edit / notes for the itinerary snapshot</Label>
        <Textarea id="staffNotes" name="staffNotes" />
      </div>
      {error ? (
        <p role="alert" className="text-small text-prayer-red">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send private quote"}
      </Button>
    </form>
  );
}
