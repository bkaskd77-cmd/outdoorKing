import { createHash, randomBytes, randomUUID } from "node:crypto";

import { AFFILIATE_COOKIE, normalizePartnerCode } from "./affiliate";

export { AFFILIATE_COOKIE, normalizePartnerCode };
export const DEMO_PARTNER_TOKEN = "demo-partner-token";
export const DEMO_PARTNER_CODE = "HIMALAYA";

export type StoredPartner = {
  id: string;
  name: string;
  code: string;
  portalToken: string;
  portalTokenHash: string;
  status: "active" | "paused";
  notes?: string;
  createdAt: string;
};

const partners = new Map<string, StoredPartner>();
const byCode = new Map<string, string>();
const byTokenHash = new Map<string, string>();

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function createPartner(input: {
  name: string;
  code: string;
  notes?: string;
  portalToken?: string;
  status?: "active" | "paused";
}): StoredPartner {
  const code = normalizePartnerCode(input.code);
  if (!code) throw new Error("Invalid partner code.");
  if (byCode.has(code)) throw new Error("Partner code already exists.");
  const portalToken = input.portalToken ?? randomBytes(24).toString("base64url");
  const portalTokenHash = hashToken(portalToken);
  const row: StoredPartner = {
    id: randomUUID(),
    name: input.name.trim(),
    code,
    portalToken,
    portalTokenHash,
    status: input.status ?? "active",
    notes: input.notes,
    createdAt: new Date().toISOString(),
  };
  partners.set(row.id, row);
  byCode.set(row.code, row.id);
  byTokenHash.set(row.portalTokenHash, row.id);
  void persistPartner(row);
  return row;
}

export function listPartners(): StoredPartner[] {
  seedDemoPartner();
  return [...partners.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function getPartnerByCode(
  code: string | undefined | null,
): StoredPartner | undefined {
  seedDemoPartner();
  const normalized = normalizePartnerCode(code);
  if (!normalized) return undefined;
  const id = byCode.get(normalized);
  return id ? partners.get(id) : undefined;
}

export function getPartnerByPortalToken(
  token: string | undefined | null,
): StoredPartner | undefined {
  seedDemoPartner();
  if (!token) return undefined;
  const id = byTokenHash.get(hashToken(token));
  return id ? partners.get(id) : undefined;
}

export function setPartnerStatus(
  id: string,
  status: "active" | "paused",
): StoredPartner | undefined {
  const row = partners.get(id);
  if (!row) return undefined;
  row.status = status;
  partners.set(id, row);
  return row;
}

function seedDemoPartner() {
  if (byCode.has(DEMO_PARTNER_CODE)) return;
  createPartner({
    name: "Himalayan Outfitters",
    code: DEMO_PARTNER_CODE,
    notes: "Demo partner for the lite portal. No public prices.",
    portalToken: DEMO_PARTNER_TOKEN,
  });
}

async function persistPartner(row: StoredPartner) {
  try {
    const { db, partners: table } = await import("@ok/db");
    await db
      .insert(table)
      .values({
        id: row.id,
        name: row.name,
        code: row.code,
        portalTokenHash: row.portalTokenHash,
        status: row.status,
        notes: row.notes,
      })
      .onConflictDoNothing();
  } catch {
    // Preview/CI without Postgres keep the in-memory row.
  }
}

seedDemoPartner();
