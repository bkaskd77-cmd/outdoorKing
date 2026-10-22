import { describe, expect, it } from "vitest";

import { generateDraftSchema, tripRequestSchema } from "./trip-request";

describe("trip request schemas", () => {
  it("accepts a complete Phase 2 request", () => {
    const parsed = tripRequestSchema.safeParse({
      tripSlug: "everest-base-camp-trek",
      activitySlugs: ["trekking"],
      regionSlugs: ["everest"],
      earliestStart: "2026-04-10",
      durationDays: 14,
      adults: 2,
      groupType: "couple",
      fitness: "balanced",
      experience: "regular",
      comfort: "teahouse",
      pace: "balanced",
      mustHaves: ["photography"],
      name: "Bikash Tester",
      email: "bikash@example.com",
      country: "Nepal",
      privacy: "on",
      turnstileToken: "1x00000000000000000000AA",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects a honeypot fill", () => {
    const parsed = tripRequestSchema.safeParse({
      earliestStart: "2026-04-10",
      durationDays: 14,
      adults: 2,
      groupType: "couple",
      fitness: "balanced",
      experience: "regular",
      comfort: "teahouse",
      pace: "balanced",
      name: "Bot",
      email: "bot@example.com",
      country: "Nepal",
      privacy: "on",
      website: "https://spam.example",
    });
    expect(parsed.success).toBe(false);
  });

  it("accepts a designer payload", () => {
    const parsed = generateDraftSchema.safeParse({
      tripSlug: "everest-base-camp-trek",
      durationDays: 14,
      month: 4,
    });
    expect(parsed.success).toBe(true);
  });
});
