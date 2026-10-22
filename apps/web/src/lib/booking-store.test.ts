import { describe, expect, it } from "vitest";

import { DEFAULT_DEPOSIT_POLICY, WIRE_FOUR_EYES_USD } from "@ok/payments";

import {
  attachIntent,
  createBookingFromQuote,
  getBooking,
  listBookings,
  listPayments,
  markWireCaptured,
  recordPaymentEvent,
} from "./booking-store";
import { saveQuote, saveRequest } from "./quote-store";

describe("booking store", () => {
  it("creates a deposit/balance schedule on quote accept", () => {
    const request = saveRequest({
      customerId: "00000000-0000-0000-0000-000000000099",
      email: "pay@example.com",
      name: "Payer",
      country: "Nepal",
      tripSlug: "everest-base-camp-trek",
      activitySlugs: ["trekking"],
      regionSlugs: ["everest"],
      status: "quoted",
      party: {
        adults: 2,
        children: 0,
        ages: [],
        groupType: "couple",
        fitness: "balanced",
        experience: "regular",
      },
      dates: {
        earliestStart: "2027-10-01",
        flexibleDays: 3,
        durationDays: 14,
        arrivalCity: "Kathmandu",
      },
      budgetBand: "undisclosed",
      preferences: { comfort: "teahouse", pace: "balanced", mustHaves: [] },
      consent: {
        privacy: true,
        marketing: false,
        health: false,
        policyVersion: "phase-3",
        at: new Date().toISOString(),
      },
    });
    const quote = saveQuote({
      tripRequestId: request.id,
      itinerarySnapshot: { tripSlug: request.tripSlug, days: [] },
      lines: [
        {
          position: 1,
          kind: "land_package",
          description: "Private land package",
          quantity: 1,
          unitPrice: 1000,
          amount: 1000,
          currency: "USD",
        },
      ],
    });
    const booking = createBookingFromQuote(quote, request, DEFAULT_DEPOSIT_POLICY);
    expect(booking.status).toBe("pending_deposit");
    expect(booking.number).toMatch(/^B-/);
    const rows = listPayments(booking.id);
    expect(rows).toHaveLength(2);
    expect(rows[0]?.kind).toBe("deposit");
    expect(rows[0]?.amount).toBe(300);
    expect(rows[1]?.kind).toBe("balance");
    expect(rows[1]?.amount).toBe(700);
    const deposit = rows[0];
    if (!deposit) throw new Error("missing deposit");
    attachIntent(deposit.id, "mock", {
      providerRef: "mock_test",
      redirectUrl: "http://localhost:3000/pay/mock?ref=mock_test",
    });
    const applied = recordPaymentEvent(deposit.id, "mock", {
      providerEventId: "evt-book-1",
      providerRef: "mock_test",
      type: "captured",
      receivedAt: new Date().toISOString(),
    });
    expect(applied.duplicate).toBe(false);
    const again = recordPaymentEvent(deposit.id, "mock", {
      providerEventId: "evt-book-1",
      providerRef: "mock_test",
      type: "captured",
      receivedAt: new Date().toISOString(),
    });
    expect(again.duplicate).toBe(true);
    expect(getBooking(booking.id)?.status).toBe("confirmed");
    expect(listBookings().some((row) => row.id === booking.id)).toBe(true);
  });

  it("requires a second finance actor for wires at or above USD 5,000", () => {
    const request = saveRequest({
      customerId: "00000000-0000-0000-0000-000000000088",
      email: "wire@example.com",
      name: "Wire",
      country: "Nepal",
      activitySlugs: ["expeditions"],
      regionSlugs: ["everest"],
      status: "quoted",
      party: {
        adults: 2,
        children: 0,
        ages: [],
        groupType: "couple",
        fitness: "balanced",
        experience: "regular",
      },
      dates: {
        earliestStart: "2026-11-01",
        flexibleDays: 3,
        durationDays: 20,
        arrivalCity: "Kathmandu",
      },
      budgetBand: "undisclosed",
      preferences: { comfort: "lodge", pace: "balanced", mustHaves: [] },
      consent: {
        privacy: true,
        marketing: false,
        health: false,
        policyVersion: "phase-3",
        at: new Date().toISOString(),
      },
    });
    const quote = saveQuote({
      tripRequestId: request.id,
      itinerarySnapshot: { days: [] },
      lines: [
        {
          position: 1,
          kind: "land_package",
          description: "Expedition",
          quantity: 1,
          unitPrice: 20_000,
          amount: 20_000,
          currency: "USD",
        },
      ],
    });
    const booking = createBookingFromQuote(quote, request, {
      depositPct: 30,
      balanceDueDaysBefore: 45,
    });
    const deposit = listPayments(booking.id).find((p) => p.kind === "deposit");
    if (!deposit) throw new Error("missing deposit");
    expect(deposit.amount).toBeGreaterThanOrEqual(WIRE_FOUR_EYES_USD);
    attachIntent(deposit.id, "wire", {
      providerRef: "wire_test",
      instructions: {
        reference: "OK-TEST-001",
        beneficiary: "OutdoorKing",
        bankName: "Himalayan Bank",
        account: "TBD",
        notes: "SWIFT wire only.",
      },
    });
    const first = markWireCaptured(deposit.id, "finance-a");
    expect(first?.status).toBe("pending");
    const same = markWireCaptured(deposit.id, "finance-a");
    expect(same?.status).toBe("pending");
    const second = markWireCaptured(deposit.id, "finance-b");
    expect(second?.status).toBe("captured");
  });
});
