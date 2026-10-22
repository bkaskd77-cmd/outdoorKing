import { env } from "@ok/env/server";

export async function sendMail(to: string, subject: string, html: string): Promise<void> {
  if (env.AI_MOCK || env.NODE_ENV === "test") {
    console.info(`[mail] ${subject} -> ${to}`);
    return;
  }
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: env.EMAIL_FROM, to: [to], subject, html }),
  });
}

export function requestReceivedHtml(name: string): string {
  return `<p>Thank you, ${name}. We have your trip request. A specialist will send a private quote — never a public price. This is not a booking or a payment.</p>`;
}

export function draftReadyHtml(name: string): string {
  return `<p>${name}, an AI-assisted draft is ready for specialist review. It is not a confirmed itinerary or quote.</p>`;
}

export function quoteSentHtml(name: string, number: string, url: string): string {
  return `<p>${name}, your private quote ${number} is ready. Open it here: <a href="${url}">${url}</a>. No payment is taken in this phase.</p>`;
}
