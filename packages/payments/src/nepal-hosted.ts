import { randomUUID } from "node:crypto";

import { headerValue, verifySignedPayload } from "./hmac";
import type {
  CallbackRequest,
  CreateIntentInput,
  PaymentProvider,
  ProviderId,
  VerifiedEvent,
} from "./types";

export type NepalHostedConfig = {
  id: Extract<ProviderId, "hbl_cybersource" | "nabil_2c2p">;
  sandboxHostedPageUrl: string;
  webhookSecret: string;
};

/**
 * Stub Nepal hosted-page provider (HBL/Cybersource or Nabil/2C2P).
 * Redirects to the bank hosted page. No card data is collected here.
 */
export function NepalHostedProvider(config: NepalHostedConfig): PaymentProvider {
  const statuses = new Map<string, "requires_action" | "captured" | "failed">();
  return {
    id: config.id,
    async createIntent(input: CreateIntentInput) {
      const providerRef = `${config.id}_${input.idempotencyKey}`;
      statuses.set(providerRef, "requires_action");
      const url = new URL(config.sandboxHostedPageUrl);
      url.searchParams.set("ref", providerRef);
      url.searchParams.set("amount", String(input.amount.amount));
      url.searchParams.set("currency", input.amount.currency);
      url.searchParams.set("return", input.returnUrl);
      return { redirectUrl: url.toString(), providerRef };
    },
    async verifyCallback(req: CallbackRequest) {
      const timestamp = headerValue(req.headers, "x-ok-timestamp");
      const signature = headerValue(req.headers, "x-ok-signature");
      if (!verifySignedPayload(config.webhookSecret, timestamp, req.rawBody, signature)) {
        throw new Error("Invalid hosted-page webhook signature.");
      }
      const body = JSON.parse(req.rawBody) as {
        providerEventId?: string;
        providerRef?: string;
        type?: VerifiedEvent["type"];
        amount?: { amount: number; currency: string };
      };
      if (!body.providerRef || !body.type) throw new Error("Invalid hosted payload.");
      if (body.type === "captured") statuses.set(body.providerRef, "captured");
      if (body.type === "failed") statuses.set(body.providerRef, "failed");
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
