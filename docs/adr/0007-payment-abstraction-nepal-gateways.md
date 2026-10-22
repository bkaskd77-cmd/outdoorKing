# ADR-0007: Payment abstraction over Nepal bank gateways and wire

- Status: Accepted (design); implementation in Phase 3 · Date: 2026-10-20

## Context
The merchant of record is the Nepali licensed agency. Stripe does not support Nepal-registered businesses. International cards are accepted through Nepali acquiring banks: Himalayan Bank or Nabil, using hosted payment pages from Cybersource or 2C2P. Large expedition balances are often paid by SWIFT wire. Domestic wallets (Khalti, eSewa, Fonepay) serve Nepali residents only, which is not a Phase 3 priority. Nepal Rastra Bank FX rules and the gateway's settlement currency (NPR or USD) affect reconciliation.

## Decision
- A **`PaymentProvider` interface** in `packages/payments` (created in Phase 3):
  ```ts
  interface PaymentProvider {
    id: 'hbl_cybersource' | 'nabil_2c2p' | 'wire' | 'mock';
    createIntent(i: { bookingId; paymentId; amount: Money; customer; returnUrl; idempotencyKey }): Promise<{ redirectUrl?: string; instructions?: WireInstructions; providerRef: string }>;
    verifyCallback(req: Request): Promise<VerifiedEvent>;   // signature/HMAC check, replay window
    getStatus(providerRef: string): Promise<PaymentStatus>; // for reconciliation polling
    refund?(providerRef: string, amount: Money, reason: string): Promise<RefundResult>;
  }
  ```
- **Hosted payment pages only.** No card data touches our servers, which keeps the PCI DSS scope at **SAQ A**. CSP `form-action` and `frame-src` allow only the configured gateway origins.
- The state machine on `app.payments` is `pending → requires_action → authorized → captured | failed | cancelled → refunded/partially_refunded`. Transitions are only driven by **verified** webhooks or reconciliation, never by the browser return URL.
- Idempotency: `idempotency_key` is unique per payment attempt. Webhooks are deduplicated by `(provider, provider_event_id)` in `app.payment_events`.
- Wire: a unique reference per invoice (`OK-<bookingShort>-<seq>`). Finance marks the payment received with proof upload and four-eyes approval when the amount is ≥ USD 5,000.
- Deposit/balance policy (for example a 20–30% deposit, with the balance due 45 days before departure) is configured per trip type in Payload, not in code.
- A nightly reconciliation job compares gateway settlement reports with `payments` and flags mismatches to finance.

## Consequences
- \+ We can swap acquirers or add one (for example a foreign-entity partner) without touching booking logic.
- − Gateway integrations vary widely in quality. Budget for sandbox access delays and manual testing with the bank.
- − Multi-currency display versus settlement currency must be explicit on quotes (`quote.currency`, `fx_rate_locked_at`).

## Alternatives rejected
Stripe via a foreign entity (conflicts with the licensed-agency sales requirement), PayPal (high fees, Nepal payout limits), embedded card fields (PCI SAQ A-EP or D scope).
