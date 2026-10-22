import { env } from "@ok/env/server";
import { getPaymentProvider, type PaymentProvider } from "@ok/payments";

export function paymentProvider(): PaymentProvider {
  return getPaymentProvider({
    provider: env.PAYMENT_PROVIDER,
    webhookSecret: env.PAYMENT_WEBHOOK_SECRET,
    hostedPageUrl: env.PAYMENT_HOSTED_PAGE_URL || undefined,
    wire: {
      beneficiary: env.WIRE_BENEFICIARY || "[[TBD: legal entity name]]",
      bankName: env.WIRE_BANK_NAME || "[[TBD: bank name]]",
      account: env.WIRE_ACCOUNT || "[[TBD: account]]",
      swift: env.WIRE_SWIFT || undefined,
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
