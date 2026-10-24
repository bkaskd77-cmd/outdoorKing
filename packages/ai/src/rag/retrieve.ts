import { distinctiveTokens, tokens } from "./tokens";
import type { RetrievedChunk, SourceChunk } from "./types";

function termScore(query: string, content: string): number {
  const q = new Set(distinctiveTokens(query));
  if (q.size === 0) return 0;
  const c = tokens(content);
  let hit = 0;
  for (const t of c) if (q.has(t)) hit += 1;
  return hit / q.size;
}

function cosineBag(query: string, content: string): number {
  const qTokens = distinctiveTokens(query);
  const cTokens = tokens(content);
  if (qTokens.length === 0 || cTokens.length === 0) return 0;
  const q = new Map<string, number>();
  const c = new Map<string, number>();
  for (const t of qTokens) q.set(t, (q.get(t) ?? 0) + 1);
  for (const t of cTokens) c.set(t, (c.get(t) ?? 0) + 1);
  let dot = 0;
  let qn = 0;
  let cn = 0;
  for (const [k, v] of q) {
    qn += v * v;
    dot += v * (c.get(k) ?? 0);
  }
  for (const v of c.values()) cn += v * v;
  if (qn === 0 || cn === 0) return 0;
  return dot / (Math.sqrt(qn) * Math.sqrt(cn));
}

function rrf(lists: SourceChunk[][], k = 60): Map<string, number> {
  const scores = new Map<string, number>();
  for (const list of lists) {
    list.forEach((chunk, index) => {
      scores.set(chunk.id, (scores.get(chunk.id) ?? 0) + 1 / (k + index + 1));
    });
  }
  return scores;
}

/**
 * Hybrid retrieval: lexical (tsvector stand-in) + bag-of-words cosine
 * (pgvector stand-in), fused with Reciprocal Rank Fusion, then top-N.
 */
export function hybridRetrieve(
  query: string,
  chunks: SourceChunk[],
  limit = 8,
): RetrievedChunk[] {
  if (distinctiveTokens(query).length === 0) return [];
  const lexical = [...chunks]
    .map((chunk) => ({
      chunk,
      score: termScore(query, `${chunk.title} ${chunk.content}`),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 40)
    .map((row) => row.chunk);
  const vector = [...chunks]
    .map((chunk) => ({
      chunk,
      score: cosineBag(query, `${chunk.title} ${chunk.content}`),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 40)
    .map((row) => row.chunk);
  const fused = rrf([lexical, vector]);
  return [...fused.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, score]) => {
      const chunk = chunks.find((c) => c.id === id);
      if (!chunk) throw new Error("missing chunk");
      return { ...chunk, score };
    });
}
