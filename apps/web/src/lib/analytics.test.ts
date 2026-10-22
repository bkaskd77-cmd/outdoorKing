import { describe, expect, it } from "vitest";

import { mergeAnalytics, mockIntelCommentary, tableAnalytics } from "./analytics";
import { saveQuote, saveRequest } from "./quote-store";

describe("analytics", () => {
  it("counts requests, quotes and conversion from existing tables", () => {
    const request = saveRequest({
      customerId: "00000000-0000-0000-0000-000000000021",
      email: "analytics@example.com",
      name: "Ana",
      country: "Nepal",
      tripSlug: "everest-base-camp-trek",
      activitySlugs: ["trekking"],
      regionSlugs: ["everest"],
      status: "new",
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
        flexibleDays: 2,
        durationDays: 14,
        arrivalCity: "Kathmandu",
      },
      budgetBand: "undisclosed",
      preferences: { comfort: "teahouse", pace: "balanced", mustHaves: [] },
      consent: {
        privacy: true,
        marketing: false,
        health: false,
        policyVersion: "phase-5",
        at: new Date().toISOString(),
      },
    });
    saveQuote({
      tripRequestId: request.id,
      itinerarySnapshot: { tripSlug: request.tripSlug },
      lines: [
        {
          position: 1,
          kind: "land_package",
          description: "Private land package",
          quantity: 1,
          unitPrice: 1,
          amount: 1,
          currency: "USD",
        },
      ],
    });
    const tables = tableAnalytics();
    expect(tables.requests).toBeGreaterThanOrEqual(1);
    expect(tables.quotes).toBeGreaterThanOrEqual(1);
    const merged = mergeAnalytics(tables, null);
    expect(merged.source).toBe("tables+mock");
    expect(merged.commentary).toContain("Mock intel");
    expect(
      mockIntelCommentary({
        requests: 0,
        quotesSent: 0,
        quotesAccepted: 0,
        bookings: 0,
      }),
    ).toContain("no requests");
  });
});
