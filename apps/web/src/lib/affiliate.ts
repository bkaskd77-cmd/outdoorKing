export const AFFILIATE_COOKIE = "ok_ref";

export function normalizePartnerCode(
  value: string | undefined | null,
): string | undefined {
  if (!value) return undefined;
  const code = value
    .trim()
    .toUpperCase()
    .replaceAll(/[^A-Z0-9_-]/g, "");
  return code.length >= 3 && code.length <= 32 ? code : undefined;
}
