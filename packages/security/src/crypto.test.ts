import { describe, expect, it } from "vitest";

import { LocalKekProvider, blindIndex, decryptField, encryptField } from "./crypto";

const kek = Buffer.alloc(32, 7).toString("base64");
const hmac = Buffer.alloc(32, 9).toString("base64");

describe("envelope encryption", () => {
  const provider = new LocalKekProvider(kek);

  it("round-trips plaintext bound to AAD", () => {
    const aad = "customer:email:rec_1";
    const ct = encryptField("ada@example.com", aad, provider);
    expect(ct.startsWith("v1:local:")).toBe(true);
    expect(decryptField(ct, aad, provider)).toBe("ada@example.com");
  });

  it("detects AAD tampering", () => {
    const ct = encryptField("secret", "table:col:id", provider);
    expect(() => decryptField(ct, "table:col:other", provider)).toThrow();
  });

  it("detects ciphertext tampering", () => {
    const ct = encryptField("secret", "aad", provider);
    const parts = ct.split(":");
    const last = parts[5];
    if (!last) throw new Error("missing ct");
    const buf = Buffer.from(last, "base64url");
    buf[0] = (buf[0] ?? 0) ^ 0xff;
    parts[5] = buf.toString("base64url");
    expect(() => decryptField(parts.join(":"), "aad", provider)).toThrow();
  });

  it("computes a stable blind index", () => {
    expect(blindIndex(" Ada@Example.com ", hmac)).toBe(
      blindIndex("ada@example.com", hmac),
    );
    expect(blindIndex("a@b.c", hmac)).not.toBe(blindIndex("x@y.z", hmac));
  });
});
