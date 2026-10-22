import { describe, expect, it } from "vitest";

import { signPayload } from "./hmac";
import { DEFAULT_DEPOSIT_POLICY, WIRE_FOUR_EYES_USD, splitDepositBalance } from "./index";
import { MockProvider, signMockWebhook } from "./mock";
import { NepalHostedProvider } from "./nepal-hosted";
import { getPaymentProvider } from "./registry";
import { WireProvider, wireReference } from "./wire";

const secret = "test-webhook-secret-must-be-long";

describe("payment providers", () => {
  it("splits deposit/balance from policy", () => {
    expect(splitDepositBalance(1000, DEFAULT_DEPOSIT_POLICY.depositPct)).toEqual({
      deposit: 300,
      balance: 700,
    });
    expect(WIRE_FOUR_EYES_USD).toBe(5000);
  });

  it("mock provider redirects and verifies a signed capture", async () => {
    const provider = MockProvider(secret);
    const intent = await provider.createIntent({
      bookingId: "b1",
      paymentId: "p1",
      amount: { amount: 300, currency: "USD" },
      customer: { email: "a@example.com", name: "A" },
      returnUrl: "http://localhost:3000/pay/mock",
      idempotencyKey: "idem-1",
    });
    expect(intent.redirectUrl).toContain("ref=mock_idem-1");
    expect(await provider.getStatus(intent.providerRef)).toBe("requires_action");
    const signed = signMockWebhook(secret, {
      providerEventId: "evt-1",
      providerRef: intent.providerRef,
      type: "captured",
      amount: { amount: 300, currency: "USD" },
    });
    const event = await provider.verifyCallback({
      headers: {
        "x-ok-timestamp": signed.timestamp,
        "x-ok-signature": signed.signature,
      },
      rawBody: signed.rawBody,
    });
    expect(event.type).toBe("captured");
    expect(await provider.getStatus(intent.providerRef)).toBe("captured");
  });

  it("rejects an unsigned mock webhook", async () => {
    const provider = MockProvider(secret);
    await expect(
      provider.verifyCallback({
        headers: { "x-ok-timestamp": "1", "x-ok-signature": "00" },
        rawBody: "{}",
      }),
    ).rejects.toThrow(/signature/);
  });

  it("wire provider returns a unique reference and never accepts card data", async () => {
    const first = wireReference("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");
    const second = wireReference("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");
    expect(first).toMatch(/^OK-AAAAAAAA-\d{3}$/);
    expect(first).not.toBe(second);
    const provider = WireProvider({
      beneficiary: "OutdoorKing Pvt Ltd",
      bankName: "Himalayan Bank",
      account: "TBD",
      swift: "HIMANPKA",
    });
    const intent = await provider.createIntent({
      bookingId: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      paymentId: "p2",
      amount: { amount: 700, currency: "USD" },
      customer: { email: "a@example.com", name: "A" },
      returnUrl: "http://localhost:3000/account",
      idempotencyKey: "idem-wire",
    });
    expect(intent.redirectUrl).toBeUndefined();
    expect(intent.instructions?.reference).toMatch(/^OK-/);
    expect(intent.instructions?.notes).toMatch(/card/i);
    await expect(provider.verifyCallback({ headers: {}, rawBody: "{}" })).rejects.toThrow(
      /finance/,
    );
  });

  it("Nepal hosted stub redirects to the sandbox hosted page", async () => {
    const provider = NepalHostedProvider({
      id: "hbl_cybersource",
      sandboxHostedPageUrl: "https://sandbox.hbl.example/pay",
      webhookSecret: secret,
    });
    const intent = await provider.createIntent({
      bookingId: "b1",
      paymentId: "p1",
      amount: { amount: 300, currency: "USD" },
      customer: { email: "a@example.com", name: "A" },
      returnUrl: "http://localhost:3000/pay/return",
      idempotencyKey: "idem-hbl",
    });
    expect(intent.redirectUrl).toContain("sandbox.hbl.example");
    expect(intent.redirectUrl).not.toContain("stripe");
    const ts = String(Math.floor(Date.now() / 1000));
    const rawBody = JSON.stringify({
      providerEventId: "bank-1",
      providerRef: intent.providerRef,
      type: "captured",
    });
    const event = await provider.verifyCallback({
      headers: {
        "x-ok-timestamp": ts,
        "x-ok-signature": signPayload(secret, ts, rawBody),
      },
      rawBody,
    });
    expect(event.providerEventId).toBe("bank-1");
  });

  it("registry defaults to mock", () => {
    expect(
      getPaymentProvider({
        provider: "mock",
        webhookSecret: secret,
        wire: { beneficiary: "x", bankName: "y", account: "z" },
      }).id,
    ).toBe("mock");
  });
});
