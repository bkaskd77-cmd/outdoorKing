const STOP = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "that",
  "this",
  "your",
  "you",
  "our",
  "are",
  "was",
  "were",
  "but",
  "not",
  "can",
  "how",
  "what",
  "when",
  "who",
  "why",
  "about",
  "tell",
  "please",
  "just",
  "have",
  "has",
  "had",
  "into",
  "onto",
  "over",
  "under",
  "into",
]);

export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFC")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length > 2);
}

/** Query terms that can match a trip — stopwords like “with” must not hit every page. */
export function distinctiveTokens(text: string): string[] {
  return tokens(text).filter((t) => !STOP.has(t));
}
