"use client";

import { Button } from "@ok/ui";
import { useState } from "react";

import { decidePrivateQuote } from "@/app/(frontend)/actions/quote";

export function DecideQuoteForm({ token }: { token: string }) {
  const [status, setStatus] = useState("");
  const [payUrl, setPayUrl] = useState("");
  const [bookingNumber, setBookingNumber] = useState("");
  const [wireRef, setWireRef] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function decide(decision: "accepted" | "declined") {
    setPending(true);
    setError("");
    const result = await decidePrivateQuote({ token, decision });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setStatus(result.data.status);
    setPayUrl(result.data.payUrl ?? "");
    setBookingNumber(result.data.bookingNumber ?? "");
    setWireRef(result.data.wireRef ?? "");
  }

  if (status) {
    return (
      <div>
        <p role="status">
          Quote {status}
          {bookingNumber ? ` · booking ${bookingNumber}` : ""}.
        </p>
        {payUrl ? (
          <p className="mt-3">
            <a className="underline" href={payUrl}>
              Pay the private deposit
            </a>
          </p>
        ) : null}
        {wireRef ? <p className="mt-3 text-small">Wire reference: {wireRef}</p> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {error ? (
        <p role="alert" className="w-full text-small text-prayer-red">
          {error}
        </p>
      ) : null}
      <Button type="button" disabled={pending} onClick={() => void decide("accepted")}>
        Accept quote
      </Button>
      <Button
        type="button"
        variant="secondary"
        disabled={pending}
        onClick={() => void decide("declined")}
      >
        Decline quote
      </Button>
    </div>
  );
}
