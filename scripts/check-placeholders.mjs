#!/usr/bin/env node
/**
 * Fails production builds when [[TBD]] placeholders remain in shipped content.
 * Preview and local builds are allowed to contain owner-confirmation markers.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const MARKER = "[[TBD";
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  ".turbo",
  "dist",
  "coverage",
  "playwright-report",
  "test-results",
]);
const SKIP_FILES = new Set(["pnpm-lock.yaml"]);

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry) || entry.startsWith(".env")) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, acc);
      continue;
    }
    if (SKIP_FILES.has(entry)) continue;
    if (/\.(png|jpe?g|webp|avif|gif|woff2?|ico|pdf|mp4)$/i.test(entry)) continue;
    acc.push(full);
  }
  return acc;
}

const hits = [];
for (const file of walk(ROOT)) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (!text.includes(MARKER)) continue;
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    if (line.includes(MARKER)) {
      hits.push(`${relative(ROOT, file)}:${String(i + 1)}:${line.trim()}`);
    }
  });
}

const production =
  process.env.VERCEL_ENV === "production" ||
  process.env.CHECK_PLACEHOLDERS_STRICT === "1";

if (hits.length > 0) {
  console.log(`Found ${String(hits.length)} placeholder marker(s):`);
  for (const hit of hits) console.log(`  ${hit}`);
  if (production) {
    console.error("Production builds cannot ship [[TBD]] placeholders.");
    process.exit(1);
  }
  console.log("Non-production build: placeholders allowed.");
} else {
  console.log("No [[TBD]] placeholders found.");
}
