import { describe, expect, it } from "vitest";

import {
  exactStaffEmails,
  isAllowedStaffEmail,
  staffMagicLinkDecision,
} from "./staff-email";

const domains = ["outdoorking.com"] as const;
const exactEmails = exactStaffEmails("bkaskd@gmail.com", "");

describe("staff address allowlist", () => {
  it("allows the one Gmail address and the company domain", () => {
    expect(isAllowedStaffEmail("bkaskd@gmail.com", { domains, exactEmails })).toBe(true);
    expect(isAllowedStaffEmail("  Bkaskd@Gmail.com ", { domains, exactEmails })).toBe(
      true,
    );
    expect(isAllowedStaffEmail("guide@outdoorking.com", { domains, exactEmails })).toBe(
      true,
    );
  });

  it("does not open every Gmail account", () => {
    expect(isAllowedStaffEmail("other@gmail.com", { domains, exactEmails })).toBe(false);
    expect(isAllowedStaffEmail("other@googlemail.com", { domains, exactEmails })).toBe(
      false,
    );
    expect(
      isAllowedStaffEmail("other@gmail.com", {
        domains: ["gmail.com", "outdoorking.com"],
        exactEmails,
      }),
    ).toBe(false);
  });

  it("treats an allowlist entry as one address", () => {
    const listed = exactStaffEmails(
      "guide@outdoorking.com",
      "owner@example.com, gmail.com",
    );
    expect(listed).toEqual(["guide@outdoorking.com", "owner@example.com"]);
    expect(
      isAllowedStaffEmail("owner@example.com", { domains, exactEmails: listed }),
    ).toBe(true);
    expect(
      isAllowedStaffEmail("second@example.com", { domains, exactEmails: listed }),
    ).toBe(false);
  });

  it("sends a staff link only for an invited allowed address", () => {
    const url =
      "https://outdoorking-seven.vercel.app/api/auth/magic-link/verify?token=example&callbackURL=%2Fadmin%2Flogin";
    expect(
      staffMagicLinkDecision({
        email: "bkaskd@gmail.com",
        magicLinkUrl: url,
        domains,
        exactEmails,
        invited: true,
      }),
    ).toBe("send");
    expect(
      staffMagicLinkDecision({
        email: "other@gmail.com",
        magicLinkUrl: url,
        domains,
        exactEmails,
        invited: true,
      }),
    ).toBe("reject");
    expect(
      staffMagicLinkDecision({
        email: "other@gmail.com",
        magicLinkUrl:
          "https://outdoorking-seven.vercel.app/api/auth/magic-link/verify?token=example&callbackURL=https%3A%2F%2Foutdoorking-seven.vercel.app%2Fadmin%2Flogin",
        domains,
        exactEmails,
        invited: true,
      }),
    ).toBe("reject");
    expect(
      staffMagicLinkDecision({
        email: "guide@outdoorking.com",
        magicLinkUrl: url,
        domains,
        exactEmails,
        invited: false,
      }),
    ).toBe("reject");
    expect(
      staffMagicLinkDecision({
        email: "traveler@gmail.com",
        magicLinkUrl:
          "https://outdoorking-seven.vercel.app/api/auth/magic-link/verify?token=example&callbackURL=%2Faccount",
        domains,
        exactEmails,
        invited: false,
      }),
    ).toBe("customer");
  });
});
