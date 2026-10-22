"use client";

import { Button, Input, Label } from "@ok/ui";
import { useState } from "react";

import { createDeskPartner } from "@/app/(frontend)/actions/desk";

export function PartnerForm() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  async function run(formData: FormData) {
    setError("");
    setDone("");
    const result = await createDeskPartner({
      name: String(formData.get("name") ?? ""),
      code: String(formData.get("code") ?? ""),
      notes: String(formData.get("notes") ?? "") || undefined,
    });
    if (!result.ok) {
      setError(result.error ?? "Could not save.");
      return;
    }
    setDone(`Saved ${result.data.code}. Portal token is shown once in the list.`);
  }

  return (
    <form
      action={run}
      className="grid max-w-md gap-3 rounded-md border border-border p-4"
    >
      <p className="font-semibold">Add partner</p>
      <Label htmlFor="partner-name">Name</Label>
      <Input id="partner-name" name="name" required />
      <Label htmlFor="partner-code">Affiliate code</Label>
      <Input id="partner-code" name="code" required />
      <Label htmlFor="partner-notes">Notes</Label>
      <Input id="partner-notes" name="notes" />
      <Button type="submit">Save partner</Button>
      {error ? (
        <p role="alert" className="text-small text-prayer-red">
          {error}
        </p>
      ) : null}
      {done ? (
        <p role="status" className="text-small">
          {done}
        </p>
      ) : null}
    </form>
  );
}
