import { describe, expect, it } from "vitest";

import {
  DEMO_PARTNER_CODE,
  DEMO_PARTNER_TOKEN,
  createPartner,
  getPartnerByCode,
  getPartnerByPortalToken,
  listPartners,
  normalizePartnerCode,
  setPartnerStatus,
} from "./partner-store";

describe("partner store", () => {
  it("normalizes affiliate codes", () => {
    expect(normalizePartnerCode(" himalaya ")).toBe("HIMALAYA");
    expect(normalizePartnerCode("ok")).toBeUndefined();
  });

  it("seeds the demo partner and looks up by code and portal token", () => {
    const demo = getPartnerByCode(DEMO_PARTNER_CODE);
    expect(demo?.name).toBe("Himalayan Outfitters");
    expect(getPartnerByPortalToken(DEMO_PARTNER_TOKEN)?.id).toBe(demo?.id);
    expect(listPartners().some((row) => row.code === DEMO_PARTNER_CODE)).toBe(true);
  });

  it("creates unique codes and can pause a partner", () => {
    const row = createPartner({
      name: "Test Lodge",
      code: `LODGE-${String(Date.now())}`,
    });
    expect(row.portalToken.length).toBeGreaterThan(8);
    const paused = setPartnerStatus(row.id, "paused");
    expect(paused?.status).toBe("paused");
  });
});
