import { describe, expect, it } from "vitest";

import { tripsForRequester } from "./personalization";
import { saveRequest } from "./quote-store";

describe("personalization", () => {
  it("returns published trips matching a signed-in requester", () => {
    saveRequest({
      customerId: "00000000-0000-0000-0000-000000000099",
      email: "phase4@example.com",
      name: "Phase Four",
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
        earliestStart: "2027-04-01",
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
        policyVersion: "phase-4",
        at: new Date().toISOString(),
      },
    });
    const trips = tripsForRequester("phase4@example.com");
    expect(trips.some((t) => t.slug === "everest-base-camp-trek")).toBe(true);
  });
});
