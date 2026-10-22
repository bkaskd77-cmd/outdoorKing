import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { answerConcierge } from "../concierge";
import { fixtureCatalog } from "../rag/fixture-catalog";

type Case = {
  id: string;
  q: string;
  expectIntent: string;
  mustInclude: string[];
  forbid: string[];
};

const file = join(
  dirname(fileURLToPath(import.meta.url)),
  "datasets/concierge-smoke.jsonl",
);
const cases: Case[] = readFileSync(file, "utf8")
  .trim()
  .split("\n")
  .map((line) => JSON.parse(line) as Case);

describe("concierge eval smoke (AI_MOCK=1)", () => {
  it("loads at least 20 grounded cases", () => {
    expect(cases.length).toBeGreaterThanOrEqual(20);
  });

  it.each(cases)("$id $expectIntent", (row) => {
    const answer = answerConcierge({
      catalog: fixtureCatalog,
      message: row.q,
      mocked: true,
    });
    expect(answer.intent).toBe(row.expectIntent);
    expect(answer.mocked).toBe(true);
    const hay = answer.text.toLowerCase();
    for (const needle of row.mustInclude) {
      expect(hay).toContain(needle.toLowerCase());
    }
    for (const bad of row.forbid) {
      expect(answer.text).not.toContain(bad);
    }
    if (answer.emergency) {
      expect(answer.pageOps).toBe(true);
      expect(answer.text).toMatch(/Himalayan Rescue Association/);
    }
  });
});
