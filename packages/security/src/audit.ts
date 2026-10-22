import { createHash } from "node:crypto";

const REDACT_KEYS = [
  "email",
  "phone",
  "passport",
  "passportNumber",
  "password",
  "token",
  "secret",
  "authorization",
  "cookie",
  "medical",
  "healthNotes",
];

export type AuditActorType = "user" | "system" | "ai_agent" | "intel_service" | "webhook";

export type AuditInput = {
  actor: { type: AuditActorType; id: string; role?: string };
  action: string;
  resource?: { type: string; id: string };
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  req?: { ip?: string; ua?: string; requestId?: string };
};

export function redact(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => redact(item));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      if (
        REDACT_KEYS.some((needle) => key.toLowerCase().includes(needle.toLowerCase()))
      ) {
        out[key] = "[REDACTED]";
      } else {
        out[key] = redact(nested);
      }
    }
    return out;
  }
  return value;
}

export function hashAuditRow(prevHash: string | null, payload: object): string {
  const canonical = JSON.stringify(payload);
  return createHash("sha256")
    .update(`${prevHash ?? ""}|${canonical}`)
    .digest("hex");
}

export function verifyChain(
  rows: { hash: string; prevHash: string | null; payload: object }[],
): boolean {
  let expectedPrev: string | null = null;
  for (const row of rows) {
    if (row.prevHash !== expectedPrev) return false;
    if (hashAuditRow(row.prevHash, row.payload) !== row.hash) return false;
    expectedPrev = row.hash;
  }
  return true;
}

export async function audit(
  input: AuditInput,
  deps: {
    getLastHash: () => Promise<string | null>;
    insert: (row: {
      actorType: AuditActorType;
      actorId: string;
      actorRole?: string;
      action: string;
      resourceType?: string;
      resourceId?: string;
      ipHash?: string;
      ua?: string;
      requestId?: string;
      before: unknown;
      after: unknown;
      prevHash: string | null;
      hash: string;
    }) => Promise<void>;
  },
): Promise<{ hash: string }> {
  const before = (redact(input.before ?? null) as Record<string, unknown> | null) ?? null;
  const after = (redact(input.after ?? null) as Record<string, unknown> | null) ?? null;
  const prevHash = await deps.getLastHash();
  const payload = {
    actorType: input.actor.type,
    actorId: input.actor.id,
    actorRole: input.actor.role ?? null,
    action: input.action,
    resourceType: input.resource?.type ?? null,
    resourceId: input.resource?.id ?? null,
    before,
    after,
  };
  const hash = hashAuditRow(prevHash, payload);
  await deps.insert({
    ...payload,
    actorRole: input.actor.role,
    resourceType: input.resource?.type,
    resourceId: input.resource?.id,
    ipHash: input.req?.ip,
    ua: input.req?.ua,
    requestId: input.req?.requestId,
    before,
    after,
    prevHash,
    hash,
  });
  return { hash };
}
