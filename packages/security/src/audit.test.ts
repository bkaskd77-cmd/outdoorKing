import { describe, expect, it } from "vitest";

import { audit, hashAuditRow, redact, verifyChain } from "./audit";

describe("audit hash chain", () => {
  it("redacts PII keys", () => {
    const out = redact({ email: "a@b.c", nested: { phone: "123" }, ok: 1 }) as {
      email: string;
      nested: { phone: string };
      ok: number;
    };
    expect(out.email).toBe("[REDACTED]");
    expect(out.nested.phone).toBe("[REDACTED]");
    expect(out.ok).toBe(1);
  });

  it("chains hashes and detects tampering", async () => {
    const rows: { hash: string; prevHash: string | null; payload: object }[] = [];
    let last: string | null = null;

    await audit(
      {
        actor: { type: "user", id: "u1", role: "admin" },
        action: "role.change",
        after: { role: "admin" },
      },
      {
        getLastHash: async () => last,
        insert: async (row) => {
          const payload = {
            actorType: row.actorType,
            actorId: row.actorId,
            actorRole: row.actorRole ?? null,
            action: row.action,
            resourceType: row.resourceType ?? null,
            resourceId: row.resourceId ?? null,
            before: row.before,
            after: row.after,
          };
          rows.push({ hash: row.hash, prevHash: row.prevHash, payload });
          last = row.hash;
        },
      },
    );

    await audit(
      {
        actor: { type: "ai_agent", id: "agent" },
        action: "payload.draft",
        resource: { type: "faq", id: "what-is-tims" },
      },
      {
        getLastHash: async () => last,
        insert: async (row) => {
          const payload = {
            actorType: row.actorType,
            actorId: row.actorId,
            actorRole: row.actorRole ?? null,
            action: row.action,
            resourceType: row.resourceType ?? null,
            resourceId: row.resourceId ?? null,
            before: row.before,
            after: row.after,
          };
          rows.push({ hash: row.hash, prevHash: row.prevHash, payload });
          last = row.hash;
        },
      },
    );

    expect(verifyChain(rows)).toBe(true);
    const first = rows[0];
    if (!first) throw new Error("missing row");
    first.hash = hashAuditRow(null, { tampered: true });
    expect(verifyChain(rows)).toBe(false);
  });
});
