import { NextResponse } from "next/server";

import { getPaymentByProviderRef, recordPaymentEvent } from "@/lib/booking-store";
import { paymentProvider } from "@/lib/payment-config";

export async function POST(
  request: Request,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider: providerId } = await context.params;
  const provider = paymentProvider();
  if (provider.id !== providerId) {
    return NextResponse.json({ error: "Unknown provider." }, { status: 404 });
  }
  const rawBody = await request.text();
  try {
    const event = await provider.verifyCallback({
      headers: request.headers,
      rawBody,
      url: request.url,
    });
    const payment = getPaymentByProviderRef(event.providerRef);
    if (!payment) {
      return NextResponse.json({ error: "Payment not found." }, { status: 404 });
    }
    const result = recordPaymentEvent(payment.id, provider.id, event);
    return NextResponse.json({
      ok: true,
      duplicate: result.duplicate,
      status: result.payment?.status,
    });
  } catch {
    return NextResponse.json({ error: "Invalid webhook." }, { status: 400 });
  }
}
