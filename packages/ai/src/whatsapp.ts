/** Public WhatsApp digits only. TBD markers and invented numbers are omitted. */
export function publicWhatsAppDigits(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes("[[TBD")) return null;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  if (/^0+$/.test(digits)) return null;
  return digits;
}

export function publicWhatsAppHref(value: string | null | undefined): string | null {
  const digits = publicWhatsAppDigits(value);
  return digits ? `https://wa.me/${digits}` : null;
}

export function firstWhatsAppNumber(
  ...candidates: Array<string | null | undefined>
): string | null {
  for (const candidate of candidates) {
    const digits = publicWhatsAppDigits(candidate);
    if (digits) return digits;
  }
  return null;
}

export function humanWhatsAppCopy(): string {
  return "I'll connect you with a specialist. Start by clicking the WhatsApp logo.";
}
