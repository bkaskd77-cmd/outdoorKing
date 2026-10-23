import { config as loadDotenv } from "dotenv";
import { resolve } from "node:path";

let loaded = false;

export function loadEnvFiles(): void {
  if (loaded) return;
  loaded = true;
  const cwd = process.cwd();
  loadDotenv({ path: resolve(cwd, ".env") });
  loadDotenv({ path: resolve(cwd, ".env.local"), override: true });
}

export function skipValidation(): boolean {
  if (process.env.SKIP_ENV_VALIDATION === "1") return true;
  // Vercel Git projects often boot before Neon/Redis secrets are attached.
  // Marketing pages are static; fail closed only when a database URL is set.
  return process.env.VERCEL === "1" && !process.env.DATABASE_URL;
}
