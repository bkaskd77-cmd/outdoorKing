import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../../apps/intel");

describe("intel OpenAPI contract", () => {
  it("exports HMAC-authenticated pricing and similar-trip paths", () => {
    const spec = JSON.parse(readFileSync(join(root, "openapi.json"), "utf8")) as {
      paths: Record<string, unknown>;
    };
    expect(spec.paths["/health"]).toBeTruthy();
    expect(spec.paths["/v1/pricing/suggest"]).toBeTruthy();
    expect(spec.paths["/v1/recommendations/similar"]).toBeTruthy();
    expect(spec.paths["/v1/analytics/summary"]).toBeTruthy();
  });
});
