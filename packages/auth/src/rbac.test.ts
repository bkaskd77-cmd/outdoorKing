import { describe, expect, it } from "vitest";

import { can, grants, permissions, roles, type Permission, type Role } from "./rbac";

const expected: Record<Role, Permission[]> = {
  customer: ["lead:read", "booking:read", "document:read_private"],
  content_editor: ["content:read_draft", "content:write_draft", "content:publish"],
  sales: [
    "content:read_draft",
    "lead:read",
    "lead:read_all",
    "quote:draft",
    "quote:send",
    "booking:read",
  ],
  ops: [
    "content:read_draft",
    "lead:read",
    "lead:read_all",
    "booking:read",
    "document:read_private",
  ],
  finance: ["booking:read", "payment:mark_wire"],
  admin: [
    "content:read_draft",
    "content:write_draft",
    "content:publish",
    "company_facts:write",
    "review:create",
    "lead:read",
    "lead:read_all",
    "quote:draft",
    "quote:send",
    "booking:read",
    "document:read_private",
    "payment:mark_wire",
    "pii:export",
    "audit:read",
  ],
  super_admin: [...permissions],
  ai_agent: ["content:read_draft", "content:write_draft", "quote:draft"],
  intel_service: ["lead:read", "booking:read"],
};

describe("RBAC matrix", () => {
  for (const role of roles) {
    for (const permission of permissions) {
      it(`${role} × ${permission}`, () => {
        const allowed = expected[role].includes(permission);
        expect(can({ role }, permission)).toBe(allowed);
      });
    }
  }

  it("denies missing principals", () => {
    expect(can(null, "content:publish")).toBe(false);
    expect(can({ role: "nope" }, "audit:read")).toBe(false);
  });

  it("ai_agent cannot publish", () => {
    expect(can({ role: "ai_agent" }, "content:publish")).toBe(false);
    expect(grants("ai_agent")).not.toContain("content:publish");
  });

  it("content_editor cannot open user role changes", () => {
    expect(can({ role: "content_editor" }, "user:role_change")).toBe(false);
  });
});
