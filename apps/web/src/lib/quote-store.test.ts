import { describe, expect, it } from "vitest";

import type { DesignerResult } from "@ok/ai";

import {
  decideQuote,
  getQuoteByToken,
  listQuotesForEmail,
  markQuoteSent,
  saveDraft,
  saveQuote,
  saveRequest,
} from "./quote-store";

const result = {
  draft: {
    baseTripId: "everest-base-camp-trek",
    days: [],
    assumptions: [],
    questionsForCustomer: [],
    narrative: "Catalog draft. No public prices.",
  },
  resolvedDays: [],
  report: {
    version: "2026.10.1",
    violations: [],
    warnings: [],
    infos: [],
    score: 100,
    explanations: [],
  },
  appliedFixes: [],
  repaired: false,
  mocked: true,
  modelId: "mock",
  promptVersion: "designer.plan.v1",
} as unknown as DesignerResult;

describe("quote store", () => {
  it("sends a private quote and accepts it by token", () => {
    const request = saveRequest({
      customerId: "00000000-0000-0000-0000-000000000001",
      email: "guest@example.com",
      name: "Guest",
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
        earliestStart: "2026-04-01",
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
        policyVersion: "phase-2",
        at: new Date().toISOString(),
      },
    });
    saveDraft(request.id, result);
    const quote = saveQuote({
      tripRequestId: request.id,
      itinerarySnapshot: { tripSlug: request.tripSlug },
      lines: [
        {
          position: 1,
          kind: "land_package",
          description: "Private land package",
          quantity: 1,
          unitPrice: 4200,
          amount: 4200,
          currency: "USD",
        },
      ],
    });
    expect(quote.status).toBe("draft");
    const sent = markQuoteSent(quote.id);
    expect(sent?.status).toBe("sent");
    expect(sent?.token).toBeTruthy();
    const found = getQuoteByToken(sent?.token ?? "");
    expect(found?.number).toBe(quote.number);
    const accepted = decideQuote(sent?.token ?? "", "accepted");
    expect(accepted?.status).toBe("accepted");
    expect(listQuotesForEmail("guest@example.com").some((q) => q.id === quote.id)).toBe(
      true,
    );
  });
});
