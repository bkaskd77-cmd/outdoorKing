const PRICE_PATTERN =
  /(?:USD|EUR|GBP|NPR|INR)\s*\$?\s*\d|\b(?:USD|EUR|GBP)\b|\$\s?\d|€\s?\d|£\s?\d|per\s+person\s+(?:from|price)/i;

export function findPriceMentions(html: string): string[] {
  const hits: string[] = [];
  const lines = html.split(/\n/);
  for (const line of lines) {
    if (PRICE_PATTERN.test(line) && !line.includes("[[TBD")) {
      hits.push(line.trim());
    }
  }
  return hits;
}

export function assertNoPublicPrices(html: string): void {
  const hits = findPriceMentions(html);
  if (hits.length > 0) {
    throw new Error(`Public price/currency leaked:\n${hits.join("\n")}`);
  }
}
