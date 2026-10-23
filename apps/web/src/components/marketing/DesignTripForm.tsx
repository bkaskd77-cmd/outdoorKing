"use client";

import { Button, Input, Label, Textarea } from "@ok/ui";
import { useActionState } from "react";

import { submitTripInterest } from "@/app/(frontend)/actions/design-trip";

const initial = { ok: false as boolean, error: "", id: "" };

export function DesignTripForm({ trip }: { trip?: string }) {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initial, formData: FormData) => {
      try {
        const result = await submitTripInterest(formData);
        if (!result?.ok) {
          return { ok: false, error: result?.error ?? "Something went wrong.", id: "" };
        }
        return { ok: true, error: "", id: result.data.id };
      } catch {
        return { ok: false, error: "Something went wrong.", id: "" };
      }
    },
    initial,
  );

  if (state.ok) {
    return (
      <p role="status">
        Thank you. We have your request ({state.id}). A specialist will design it around
        your dates.
      </p>
    );
  }

  return (
    <form action={action} className="grid max-w-xl gap-4">
      <input type="hidden" name="trip" value={trip ?? ""} />
      <input type="hidden" name="turnstileToken" value="1x00000000000000000000AA" />
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <Input id="country" name="country" required autoComplete="country-name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="interests">Interests (activities or regions)</Label>
        <Input id="interests" name="interests" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="month">Approximate month</Label>
        <Input id="month" name="month" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="duration">Duration</Label>
        <Input id="duration" name="duration" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="partySize">Party size</Label>
        <Input
          id="partySize"
          name="partySize"
          type="number"
          min={1}
          max={12}
          defaultValue={2}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">How do you like to travel?</Label>
        <Textarea id="message" name="message" />
      </div>
      <label className="flex min-h-11 items-center gap-3 text-small">
        <input type="checkbox" name="privacy" required />I have read the privacy policy
        (required)
      </label>
      <label className="flex min-h-11 items-center gap-3 text-small">
        <input type="checkbox" name="marketing" />
        Optional updates about new journeys
      </label>
      {state.error ? (
        <p role="alert" className="text-small text-prayer-red">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" variant="magnetic" disabled={pending}>
        {pending ? "Sending…" : "Request a private quote"}
      </Button>
    </form>
  );
}
