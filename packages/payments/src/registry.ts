import { MockProvider } from "./mock";
import { NepalHostedProvider } from "./nepal-hosted";
import type { PaymentProvider, ProviderId } from "./types";
import { WireProvider, type WireBank } from "./wire";

export type PaymentsConfig = {
  provider: ProviderId;
  webhookSecret: string;
  hostedPageUrl?: string;
  wire: WireBank;
};

export function getPaymentProvider(config: PaymentsConfig): PaymentProvider {
  switch (config.provider) {
    case "wire":
      return WireProvider(config.wire);
    case "hbl_cybersource":
    case "nabil_2c2p":
      return NepalHostedProvider({
        id: config.provider,
        sandboxHostedPageUrl:
          config.hostedPageUrl ?? "https://sandbox.invalid/hosted-page",
        webhookSecret: config.webhookSecret,
      });
    default:
      return MockProvider(config.webhookSecret);
  }
}
