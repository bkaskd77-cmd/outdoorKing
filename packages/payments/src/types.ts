export type ProviderId = "hbl_cybersource" | "nabil_2c2p" | "wire" | "mock";

export type Money = {
  amount: number;
  currency: string;
};

export type PaymentStatus =
  | "pending"
  | "requires_action"
  | "authorized"
  | "captured"
  | "failed"
  | "cancelled"
  | "refunded"
  | "partially_refunded";

export type WireInstructions = {
  reference: string;
  beneficiary: string;
  bankName: string;
  account: string;
  swift?: string;
  notes: string;
};

export type CreateIntentInput = {
  bookingId: string;
  paymentId: string;
  amount: Money;
  customer: { email: string; name: string };
  returnUrl: string;
  idempotencyKey: string;
};

export type CreateIntentResult = {
  redirectUrl?: string;
  instructions?: WireInstructions;
  providerRef: string;
};

export type VerifiedEvent = {
  providerEventId: string;
  providerRef: string;
  type: "authorized" | "captured" | "failed" | "cancelled" | "refunded";
  amount?: Money;
  receivedAt: string;
};

export type RefundResult = {
  ok: boolean;
  providerRef: string;
};

export type CallbackRequest = {
  headers: Headers | Record<string, string | null | undefined>;
  rawBody: string;
  url?: string;
};

export interface PaymentProvider {
  id: ProviderId;
  createIntent(input: CreateIntentInput): Promise<CreateIntentResult>;
  verifyCallback(req: CallbackRequest): Promise<VerifiedEvent>;
  getStatus(providerRef: string): Promise<PaymentStatus>;
  refund?(providerRef: string, amount: Money, reason: string): Promise<RefundResult>;
}
