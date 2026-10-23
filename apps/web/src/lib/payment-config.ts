import { env } from "@ok/env/server";
import { getPaymentProvider, type PaymentProvider } from "@ok/payments";

function ownerFact(value: string | undefined): string {
  if (!value || value.includes("[[TBD")) return "";
  return value;
}

export function paymentProvider(): PaymentProvider {
  return getPaymentProvider({
    provider: env.PAYMENT_PROVIDER,
    webhookSecret: env.PAYMENT_WEBHOOK_SECRET,
    hostedPageUrl: env.PAYMENT_HOSTED_PAGE_URL || undefined,
    wire: {
      beneficiary: ownerFact(env.WIRE_BENEFICIARY),
      bankName: ownerFact(env.WIRE_BANK_NAME),
      account: ownerFact(env.WIRE_ACCOUNT),
      swift: ownerFact(env.WIRE_SWIFT) || undefined,
    },
  });
}

export function intelConfig() {
  return {
    baseUrl: env.INTEL_BASE_URL,
    hmacSecret: env.INTEL_HMAC_SECRET,
    timeoutMs: 3000,
  };
}
