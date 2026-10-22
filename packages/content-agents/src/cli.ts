#!/usr/bin/env node
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { contentTypes, runPipeline, type ContentType } from "./pipeline";

function arg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

const type = arg("--type") as ContentType | undefined;
const slug = arg("--slug");
const briefPath = arg("--brief");

if (!type || !contentTypes.includes(type) || !slug) {
  console.error(
    "Usage: pnpm agents run --type <trip|region|post|faq> --slug <slug> [--brief path]",
  );
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const runsDir = resolve(here, "../runs");
await mkdir(runsDir, { recursive: true });

const brief = briefPath ? await readFile(briefPath, "utf8") : undefined;
const result = await runPipeline({ type, slug, brief, runsDir });

console.log(
  JSON.stringify(
    {
      slug: result.draft.slug,
      status: result.draft.status,
      sources: result.draft.sources.length,
      publishAllowed: result.publishAllowed,
      runPath: result.runPath,
      written: result.written,
    },
    null,
    2,
  ),
);

if (result.publishAllowed) {
  console.error("ai_agent must not be able to publish.");
  process.exit(2);
}
