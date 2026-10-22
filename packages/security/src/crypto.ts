import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";

export interface KekProvider {
  readonly kekId: string;
  wrap(dek: Buffer): Buffer;
  unwrap(wrapped: Buffer): Buffer;
}

export class LocalKekProvider implements KekProvider {
  readonly kekId: string;
  readonly #kek: Buffer;

  constructor(kekBase64: string, kekId = "local") {
    this.kekId = kekId;
    this.#kek = Buffer.from(kekBase64, "base64");
    if (this.#kek.length !== 32) {
      throw new Error("PII KEK must be 32 bytes (base64).");
    }
  }

  wrap(dek: Buffer): Buffer {
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", this.#kek, iv);
    const ct = Buffer.concat([cipher.update(dek), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, ct]);
  }

  unwrap(wrapped: Buffer): Buffer {
    const iv = wrapped.subarray(0, 12);
    const tag = wrapped.subarray(12, 28);
    const ct = wrapped.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", this.#kek, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(ct), decipher.final()]);
  }
}

/** Phase 2 wires AWS/GCP KMS behind this interface. */
export class KmsKekProviderStub implements KekProvider {
  readonly kekId = "kms-stub";
  wrap(): Buffer {
    throw new Error("KMS KEK provider is not wired until Phase 2.");
  }
  unwrap(): Buffer {
    throw new Error("KMS KEK provider is not wired until Phase 2.");
  }
}

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function fromB64url(value: string): Buffer {
  return Buffer.from(value, "base64url");
}

export function encryptField(
  plaintext: string,
  aad: string,
  provider: KekProvider,
): string {
  const dek = randomBytes(32);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", dek, iv);
  cipher.setAAD(Buffer.from(aad, "utf8"));
  const ct = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  const wrappedDek = provider.wrap(dek);
  return [
    "v1",
    provider.kekId,
    b64url(wrappedDek),
    b64url(iv),
    b64url(tag),
    b64url(ct),
  ].join(":");
}

export function decryptField(
  ciphertext: string,
  aad: string,
  provider: KekProvider,
): string {
  const parts = ciphertext.split(":");
  if (parts.length !== 6 || parts[0] !== "v1") {
    throw new Error("Unsupported ciphertext version.");
  }
  const [, kekId, wrappedDek, iv, tag, ct] = parts;
  if (!kekId || !wrappedDek || !iv || !tag || !ct) {
    throw new Error("Malformed ciphertext.");
  }
  if (kekId !== provider.kekId) {
    throw new Error(`Unknown kekId ${kekId}.`);
  }
  const dek = provider.unwrap(fromB64url(wrappedDek));
  const decipher = createDecipheriv("aes-256-gcm", dek, fromB64url(iv));
  decipher.setAAD(Buffer.from(aad, "utf8"));
  decipher.setAuthTag(fromB64url(tag));
  return Buffer.concat([decipher.update(fromB64url(ct)), decipher.final()]).toString(
    "utf8",
  );
}

export function normalizeForIndex(value: string): string {
  return value.trim().toLowerCase();
}

export function blindIndex(value: string, hmacKeyBase64: string): string {
  const key = Buffer.from(hmacKeyBase64, "base64");
  return createHmac("sha256", key).update(normalizeForIndex(value)).digest("hex");
}
