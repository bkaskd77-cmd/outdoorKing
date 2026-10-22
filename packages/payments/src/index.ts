export type {
  CallbackRequest,
  CreateIntentInput,
  CreateIntentResult,
  Money,
  PaymentProvider,
  PaymentStatus,
  ProviderId,
  RefundResult,
  VerifiedEvent,
  WireInstructions,
} from "./types";
export { signPayload, verifySignedPayload } from "./hmac";
export { MockProvider, signMockWebhook } from "./mock";
export { NepalHostedProvider } from "./nepal-hosted";
export { WireProvider, wireReference } from "./wire";
export { getPaymentProvider, type PaymentsConfig } from "./registry";

export const DEFAULT_DEPOSIT_POLICY = {
  depositPct: 30,
  balanceDueDaysBefore: 45,
} as const;

/** ADR-0007: four-eyes approval for wires at or above this USD amount. */
export const WIRE_FOUR_EYES_USD = 5000;

export function splitDepositBalance(
  total: number,
  depositPct: number = DEFAULT_DEPOSIT_POLICY.depositPct,
): { deposit: number; balance: number } {
  const deposit = Math.round((total * depositPct) / 100);
  return { deposit, balance: Math.max(0, Math.round(total - deposit)) };
}
