import { afterEach, describe, expect, it } from "vitest";

import { skipValidation } from "./load";

describe("skipValidation", () => {
  const original = {
    SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION,
    VERCEL: process.env.VERCEL,
    DATABASE_URL: process.env.DATABASE_URL,
  };

  afterEach(() => {
    restore("SKIP_ENV_VALIDATION", original.SKIP_ENV_VALIDATION);
    restore("VERCEL", original.VERCEL);
    restore("DATABASE_URL", original.DATABASE_URL);
  });

  it("is true when SKIP_ENV_VALIDATION=1", () => {
    process.env.SKIP_ENV_VALIDATION = "1";
    delete process.env.VERCEL;
    expect(skipValidation()).toBe(true);
  });

  it("is true on Vercel when DATABASE_URL is unset", () => {
    delete process.env.SKIP_ENV_VALIDATION;
    process.env.VERCEL = "1";
    delete process.env.DATABASE_URL;
    expect(skipValidation()).toBe(true);
  });

  it("is false on Vercel when DATABASE_URL is set", () => {
    delete process.env.SKIP_ENV_VALIDATION;
    process.env.VERCEL = "1";
    process.env.DATABASE_URL = "postgres://example";
    expect(skipValidation()).toBe(false);
  });
});

function restore(key: string, value: string | undefined) {
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
}
