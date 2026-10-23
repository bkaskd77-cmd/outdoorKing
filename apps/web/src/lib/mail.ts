import { enqueue } from "@ok/jobs";

export async function sendMail(to: string, subject: string, html: string): Promise<void> {
  await enqueue({
    name: "email.send",
    payload: { to, subject, html },
  });
}

export function requestReceivedHtml(name: string): string {
  return `<p>Thank you, ${name}. We have your trip request. A specialist will design it around your dates. This is not a booking.</p>`;
}

export function draftReadyHtml(name: string): string {
  return `<p>${name}, an AI-assisted draft is ready for specialist review. It is not a confirmed itinerary or quote.</p>`;
}

export function quoteSentHtml(name: string, number: string, url: string): string {
  return `<p>${name}, your private quote ${number} is ready. Open it here: <a href="${url}">${url}</a>. No payment is taken in this phase.</p>`;
}

export function conciergeHandoffHtml(input: {
  summary: string;
  emergency: boolean;
  locale: string;
}): string {
  const heading = input.emergency
    ? "Altitude emergency — page on-call operations."
    : "Concierge asked for a human specialist.";
  return `<p>${heading}</p><p>Locale: ${input.locale}</p><p>${input.summary}</p><p>No quote amounts are included.</p>`;
}
