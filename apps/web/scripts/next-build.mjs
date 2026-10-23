import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const args = ["build"];

// Turbopack's next/font/google replacer errors on Noto Sans Devanagari
// ("queries have exactly one entry") in the standalone CI/Docker build.
// Vercel preview/production already succeed with default `next build`.
if (!process.env.VERCEL) {
  args.push("--webpack");
}

const result = spawnSync(process.execPath, [nextBin, ...args], {
  stdio: "inherit",
  env: process.env,
});
process.exit(result.status ?? 1);
