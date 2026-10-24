import { describe, expect, it } from "vitest";

import { companyFacts, faqs, getTrips, pages, permits } from "@/content/catalog";

import {
  containsPlaceholder,
  isPlaceholder,
  publicLines,
  publicTrustItems,
  toPublicTrip,
  withoutPlaceholders,
} from "./placeholders";

describe("placeholders", () => {
  it("detects owner-fact markers without treating real copy as empty", () => {
    expect(isPlaceholder("[[TBD: licence no.]]")).toBe(true);
    expect(isPlaceholder("[[TBD: review count]] verified reviews")).toBe(true);
    expect(isPlaceholder("")).toBe(true);
    expect(isPlaceholder("12")).toBe(false);
    expect(containsPlaceholder("Licensed guide [[TBD: named guide / ratio]]")).toBe(true);
  });

  it("strips markers and leftover labels instead of leaving Fees:.", () => {
    expect(withoutPlaceholders("Fees: [[TBD: 2026 TIMS fee table]].")).toBe("");
    expect(
      withoutPlaceholders(
        "OutdoorKing handles paperwork for private journeys. [[TBD: 2026 TIMS fee table]]",
      ),
    ).toBe("OutdoorKing handles paperwork for private journeys.");
    expect(
      withoutPlaceholders("Party size is yours. [[TBD: max party / guide ratio]]."),
    ).toBe("Party size is yours.");
    expect(withoutPlaceholders("Licensed guide [[TBD: named guide / ratio]]")).toBe(
      "Licensed guide",
    );
    expect(
      withoutPlaceholders(
        "Usually within [[TBD: quote SLA]]. No payment to request one.",
      ),
    ).toBe("No payment to request one.");
  });

  it("omits licence, years and review-count until real facts exist", () => {
    expect(publicTrustItems(companyFacts)).toEqual([]);
    expect(
      publicTrustItems({
        ...companyFacts,
        licenceNo: "NTB-1",
        years: "8",
        reviewSummary: "14 verified reviews",
      }),
    ).toEqual([
      "Licensed by Nepal Tourism Board #NTB-1",
      "8 years on the trail",
      "14 verified reviews",
    ]);
  });

  it("keeps source catalog markers but public copy has none", () => {
    expect(companyFacts.licenceNo).toContain("[[TBD");
    expect(isPlaceholder(companyFacts.whatsapp)).toBe(true);
    const published = [
      ...pages.filter((page) => page.status === "published").map((page) => page.body),
      ...faqs.map((faq) => faq.answer),
      ...permits.map((permit) => permit.notes),
      ...getTrips("published").flatMap((trip) => [trip.overview, ...trip.inclusions]),
    ];
    expect(published.some((text) => containsPlaceholder(text))).toBe(true);
    for (const text of publicLines(published)) {
      expect(text).not.toContain("[[TBD");
    }
    for (const trip of getTrips("published")) {
      expect(JSON.stringify(toPublicTrip(trip))).not.toContain("[[TBD");
    }
  });
});
