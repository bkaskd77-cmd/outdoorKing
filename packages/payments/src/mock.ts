import { randomUUID } from "node:crypto";

import { headerValue, signPayload, verifySignedPayload } from "./hmac";
import type {
  CallbackRequest,
  CreateIntentInput,
  PaymentProvider,
  PaymentStatus,
  VerifiedEvent,
} from "./types";

const statuses = new Map<string, PaymentStatus>();

export function MockProvider(secret: string): PaymentProvider {
  return {
    id: "mock",
    async createIntent(input: CreateIntentInput) {
      const providerRef = `mock_${input.idempotencyKey}`;
      statuses.set(providerRef, "requires_action");
      const url = new URL(input.returnUrl);
      url.searchParams.set("paymentId", input.paymentId);
      url.searchParams.set("ref", providerRef);
      url.searchParams.set("bookingId", input.bookingId);
      return { redirectUrl: url.toString(), providerRef };
    },
    async verifyCallback(req: CallbackRequest) {
      const timestamp = headerValue(req.headers, "x-ok-timestamp");
      const signature = headerValue(req.headers, "x-ok-signature");
      if (!verifySignedPayload(secret, timestamp, req.rawBody, signature)) {
        throw new Error("Invalid mock webhook signature.");
      }
      const body = JSON.parse(req.rawBody) as {
        providerEventId?: string;
        providerRef?: string;
        type?: VerifiedEvent["type"];
        amount?: { amount: number; currency: string };
      };
      if (!body.providerRef || !body.type) throw new Error("Invalid mock payload.");
      if (body.type === "captured" || body.type === "authorized") {
        statuses.set(body.providerRef, body.type);
      } else if (body.type === "failed" || body.type === "cancelled") {
        statuses.set(body.providerRef, body.type);
      } else if (body.type === "refunded") {
        statuses.set(body.providerRef, "refunded");
      }
      return {
        providerEventId: body.providerEventId ?? randomUUID(),
        providerRef: body.providerRef,
        type: body.type,
        amount: body.amount,
        receivedAt: new Date().toISOString(),
      };
    },
    async getStatus(providerRef: string) {
      return statuses.get(providerRef) ?? "pending";
    },
  };
}

export function signMockWebhook(
  secret: string,
  payload: Record<string, unknown>,
): { timestamp: string; signature: string; rawBody: string } {
  const rawBody = JSON.stringify(payload);
  const timestamp = String(Math.floor(Date.now() / 1000));
  return { timestamp, signature: signPayload(secret, timestamp, rawBody), rawBody };
}
