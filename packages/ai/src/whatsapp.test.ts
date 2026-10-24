import { describe, expect, it } from "vitest";

import {
  firstWhatsAppNumber,
  humanWhatsAppCopy,
  publicWhatsAppDigits,
  publicWhatsAppHref,
} from "./whatsapp";

describe("public WhatsApp number", () => {
  it("omits placeholders and empty values instead of inventing a number", () => {
    expect(publicWhatsAppDigits("[[TBD: WhatsApp]]")).toBeNull();
    expect(publicWhatsAppDigits("")).toBeNull();
    expect(publicWhatsAppDigits("   ")).toBeNull();
    expect(publicWhatsAppHref(undefined)).toBeNull();
    expect(firstWhatsAppNumber("[[TBD: WhatsApp]]", "")).toBeNull();
  });

  it("accepts a real owner number and builds wa.me without adding digits", () => {
    expect(publicWhatsAppDigits("+977 980-111-2222")).toBe("9779801112222");
    expect(publicWhatsAppHref("+977 980-111-2222")).toBe("https://wa.me/9779801112222");
    expect(firstWhatsAppNumber("[[TBD: WhatsApp]]", "+9779801112222")).toBe(
      "9779801112222",
    );
  });

  it("asks them to click the WhatsApp logo without inventing a number", () => {
    const copy = humanWhatsAppCopy();
    expect(copy).toMatch(/specialist/);
    expect(copy).toMatch(/WhatsApp logo/);
    expect(copy).not.toMatch(/Design my trip|I passed along/i);
    expect(copy).not.toContain("the number is missing");
    expect(copy).not.toMatch(/\d{8,}/);
  });
});
