"use client";

import { Button, Input, Label, Textarea } from "@ok/ui";
import { useState, type FormEvent } from "react";

type WriterResult = {
  status: string;
  slug: string;
  title: string;
  body: string;
  publishAllowed: boolean;
  mocked: boolean;
  written: { id: string } | null;
};

export function AiWriterForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WriterResult | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setResult(null);
    const form = new FormData(event.currentTarget);
    const res = await fetch("/api/ai/writer", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: form.get("type"),
        slug: form.get("slug"),
        brief: form.get("brief") || undefined,
      }),
    });
    const json = (await res.json()) as WriterResult & { error?: string };
    setPending(false);
    if (!res.ok) {
      setError(json.error ?? "Writer failed.");
      return;
    }
    setResult(json);
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-xl gap-4">
      <div className="grid gap-2">
        <Label htmlFor="type">Content type</Label>
        <select
          id="type"
          name="type"
          className="h-11 rounded-md border border-border bg-background px-3"
          defaultValue="faq"
        >
          <option value="trip">Trip</option>
          <option value="post">Post</option>
          <option value="faq">FAQ</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" required defaultValue="what-is-tims" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="brief">Brief (optional)</Label>
        <Textarea id="brief" name="brief" rows={4} />
      </div>
      {error ? (
        <p role="alert" className="text-small text-prayer-red">
          {error}
        </p>
      ) : null}
      {result ? (
        <p role="status" className="text-small">
          Draft saved as {result.status} for {result.title}. Publish is blocked for
          ai_agent{result.mocked ? " (AI_MOCK path)" : ""}.
          {result.written?.id
            ? ` Payload id ${result.written.id}.`
            : " Payload write skipped."}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Writing…" : "Create draft"}
      </Button>
    </form>
  );
}
