import type { CompanyFacts } from "@/content/types";

const PLACEHOLDER_TOKEN = /\[\[TBD(?::[^\]]*)?\]\]/g;
const INCOMPLETE_TAIL =
  /\b(?:within|when|where|who|how|are|is|and|or|with|by|for|to|of|at|from|until|since)\.?$/i;

export function containsPlaceholder(value: string): boolean {
  return value.includes("[[TBD");
}

/** True when a fact is missing or still an owner-confirmation marker. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (value == null) return true;
  const trimmed = value.trim();
  if (!trimmed) return true;
  return containsPlaceholder(trimmed);
}

function tidyFragment(fragment: string): string {
  let text = fragment.replaceAll("\0", "").replace(/\s+/g, " ").trim();
  if (!text || /^[—\-·,.;:\s]*$/.test(text)) return "";
  if (/^[^.]{1,48}:\s*[.,;:]?$/.test(text)) return "";
  text = text
    .replace(/\(\s*\)/g, "")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/:(?=[.,]|$)/g, "")
    .replace(/\s+\./g, ".")
    .replace(/^[.:;,\s]+/, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text || /^[—\-·,.;:\s]*$/.test(text)) return "";
  if (/^[^.]{1,48}:\s*$/.test(text)) return "";
  if (INCOMPLETE_TAIL.test(text) && text.split(/\s+/).length <= 8) return "";
  return text;
}

/** Strip `[[TBD: …]]` markers and drop leftover empty labels or fragments. */
export function withoutPlaceholders(text: string): string {
  if (!containsPlaceholder(text)) return text;
  const marked = text.replace(PLACEHOLDER_TOKEN, "\0");
  const parts = marked.split(/([.!?]+)\s+/);
  const rebuilt: string[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    const body = tidyFragment(parts[i] ?? "");
    const punct = parts[i + 1] ?? "";
    if (!body) continue;
    rebuilt.push(punct ? `${body}${punct}` : body);
  }
  return rebuilt.join(" ").replace(/\s+/g, " ").trim();
}

export function publicLines(items: string[]): string[] {
  return items.map((item) => withoutPlaceholders(item).trim()).filter(Boolean);
}

/**
 * Licence, years, and review-count copy stay off public chrome until the
 * owner supplies real values. Do not invent substitutes.
 */
export function publicTrustItems(facts: CompanyFacts): string[] {
  const items: string[] = [];
  if (!isPlaceholder(facts.licenceNo)) {
    items.push(`Licensed by Nepal Tourism Board #${facts.licenceNo}`);
  }
  if (!isPlaceholder(facts.years)) {
    items.push(`${facts.years} years on the trail`);
  }
  if (!isPlaceholder(facts.reviewSummary)) {
    items.push(facts.reviewSummary);
  }
  return items;
}
