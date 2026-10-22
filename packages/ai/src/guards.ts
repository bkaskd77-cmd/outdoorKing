const ZERO_WIDTH = /[\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g;

export const CONCIERGE_MAX_CHARS = 2000;

export function sanitizeUserText(raw: string): string {
  const normalized = raw.normalize("NFC").replace(ZERO_WIDTH, "");
  return normalized.trim().slice(0, CONCIERGE_MAX_CHARS);
}

export function tokenizePii(text: string): string {
  return text
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email]")
    .replace(/\+?\d[\d\s().-]{7,}\d/g, "[phone]");
}

const INJECTION =
  /ignore (all |any )?(previous|prior|above) (instructions|prompts)|system prompt|jailbreak|reveal (your |the )?(hidden )?instructions|exfiltrat/i;

export function isInjectionAttempt(text: string): boolean {
  return INJECTION.test(text);
}

const EMERGENCY =
  /\b(evacuate (me|us)|evacuation now|i need (a )?(rescue|helicopter)|we need (a )?(rescue|helicopter)|need (a )?rescue now|i (have|got) (ams|hace|hape)|altitude sickness now|unconscious|can't breathe|cannot breathe|cant breathe|chest pain|someone is dying)\b/i;

export function isAltitudeEmergency(text: string): boolean {
  if (/\b(insurance|policy|cover|coverage|quoted?)\b/i.test(text)) return false;
  return EMERGENCY.test(text);
}

export function wrapRetrievedFacts(facts: string): string {
  return `<retrieved_facts>\n${facts}\n</retrieved_facts>`;
}
