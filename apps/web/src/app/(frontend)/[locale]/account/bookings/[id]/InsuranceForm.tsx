"use client";

import { Button, Input, Label } from "@ok/ui";
import { useState } from "react";

import { saveInsurance } from "@/app/(frontend)/actions/booking";

export function InsuranceForm({ bookingId }: { bookingId: string }) {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function action(formData: FormData) {
    const result = await saveInsurance({
      bookingId,
      provider: String(formData.get("provider") ?? ""),
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSaved(true);
  }

  if (saved) return <p role="status">Insurance provider saved.</p>;

  return (
    <form action={action} className="grid max-w-md gap-3">
      <div className="grid gap-2">
        <Label htmlFor="provider">Insurance provider</Label>
        <Input id="provider" name="provider" required autoComplete="organization" />
      </div>
      {error ? (
        <p role="alert" className="text-small text-prayer-red">
          {error}
        </p>
      ) : null}
      <Button type="submit">Save insurer</Button>
    </form>
  );
}
