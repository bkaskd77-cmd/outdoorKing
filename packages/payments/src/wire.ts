import type {
  CallbackRequest,
  CreateIntentInput,
  PaymentProvider,
  WireInstructions,
} from "./types";

export type WireBank = {
  beneficiary: string;
  bankName: string;
  account: string;
  swift?: string;
};

const statuses = new Map<string, "pending" | "captured">();
let seq = 1;

export function wireReference(bookingId: string): string {
  const short = bookingId.replaceAll("-", "").slice(0, 8).toUpperCase();
  const n = String(seq).padStart(3, "0");
  seq += 1;
  return `OK-${short}-${n}`;
}

export function WireProvider(bank: WireBank): PaymentProvider {
  return {
    id: "wire",
    async createIntent(input: CreateIntentInput) {
      const reference = wireReference(input.bookingId);
      const providerRef = `wire_${input.idempotencyKey}`;
      statuses.set(providerRef, "pending");
      const instructions: WireInstructions = {
        reference,
        beneficiary: bank.beneficiary,
        bankName: bank.bankName,
        account: bank.account,
        swift: bank.swift,
        notes: `SWIFT wire only. Quote the reference ${reference} exactly. Do not send card details.`,
      };
      return { instructions, providerRef };
    },
    async verifyCallback(_req: CallbackRequest) {
      throw new Error("Wire payments are marked received by finance, not by webhook.");
    },
    async getStatus(providerRef: string) {
      return statuses.get(providerRef) ?? "pending";
    },
  };
}
