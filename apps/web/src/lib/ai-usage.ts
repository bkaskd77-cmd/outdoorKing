export type AiUsageRow = {
  alias: string;
  model: string;
  tokens: number;
  costUsd: number;
  day: string;
};

const usage: AiUsageRow[] = [];

export function recordAiUsage(input: {
  alias: string;
  model?: string;
  tokens?: number;
  costUsd?: number;
}): void {
  usage.push({
    alias: input.alias,
    model: input.model ?? "mock",
    tokens: input.tokens ?? 0,
    costUsd: input.costUsd ?? 0,
    day: new Date().toISOString().slice(0, 10),
  });
}

export function listAiUsage(): AiUsageRow[] {
  return [...usage];
}

export function summarizeAiUsage(): {
  alias: string;
  tokens: number;
  costUsd: number;
  calls: number;
}[] {
  const byAlias = new Map<
    string,
    { alias: string; tokens: number; costUsd: number; calls: number }
  >();
  for (const row of usage) {
    const current = byAlias.get(row.alias) ?? {
      alias: row.alias,
      tokens: 0,
      costUsd: 0,
      calls: 0,
    };
    current.tokens += row.tokens;
    current.costUsd += row.costUsd;
    current.calls += 1;
    byAlias.set(row.alias, current);
  }
  return [...byAlias.values()].sort((a, b) => a.alias.localeCompare(b.alias));
}
