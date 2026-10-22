import { describe, expect, it } from "vitest";

import { companyFactsWrite, hasPermission, staffWrite, assertCanPublish } from "./access";

describe("Payload access", () => {
  it("content_editor cannot read finance or mark wires", () => {
    expect(hasPermission({ role: "content_editor" }, "finance:read")).toBe(false);
    expect(hasPermission({ role: "content_editor" }, "payment:mark_wire")).toBe(false);
  });

  it("sales cannot publish company-facts or content", () => {
    expect(hasPermission({ role: "sales" }, "company_facts:write")).toBe(false);
    expect(hasPermission({ role: "sales" }, "content:publish")).toBe(false);
    const update = companyFactsWrite({
      req: { user: { role: "sales" } },
    } as never);
    expect(update).toBe(false);
  });

  it("ai_agent can write drafts but cannot publish", () => {
    expect(staffWrite({ req: { user: { role: "ai_agent" } } } as never)).toBe(true);
    expect(() => assertCanPublish({ role: "ai_agent" })).toThrow(/not allowed/);
  });
});
