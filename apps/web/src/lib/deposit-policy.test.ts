import { describe, expect, it } from "vitest";

import { DEFAULT_DEPOSIT_POLICY } from "@ok/payments";

import { defaultDepositPolicy, policyFromTrip } from "./deposit-policy";

describe("deposit policy", () => {
  it("defaults to the Payload 30/45 policy", () => {
    expect(defaultDepositPolicy()).toEqual(DEFAULT_DEPOSIT_POLICY);
  });

  it("prefers trip policy from Payload", () => {
    expect(
      policyFromTrip({ depositPolicy: { depositPct: 20, balanceDueDaysBefore: 60 } }),
    ).toEqual({ depositPct: 20, balanceDueDaysBefore: 60 });
  });
});
