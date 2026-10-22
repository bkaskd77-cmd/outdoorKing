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
  return process.env.SKIP_ENV_VALIDATION === "1";
}
