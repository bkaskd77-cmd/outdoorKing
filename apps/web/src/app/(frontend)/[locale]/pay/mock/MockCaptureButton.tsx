"use client";

import { Button } from "@ok/ui";
import { useState } from "react";

import { simulateMockCapture } from "@/app/(frontend)/actions/booking";

export function MockCaptureButton({ paymentId }: { paymentId: string }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);
    const result = await simulateMockCapture({ paymentId });
    setPending(false);
    if (!result.ok) {
      setMessage(result.error);
      return;
    }
    setMessage(`Captured. Booking ${result.data.bookingStatus ?? "updated"}.`);
  }

  if (message) return <p role="status">{message}</p>;

  return (
    <Button type="button" disabled={pending} onClick={() => void onClick()}>
      {pending ? "Capturing…" : "Simulate bank capture"}
    </Button>
  );
}
