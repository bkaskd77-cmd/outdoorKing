import { describe, expect, it } from "vitest";

import { intelRequest } from "./index";

describe("intel client", () => {
  it("returns null when unconfigured", async () => {
    const result = await intelRequest(
      { baseUrl: "", hmacSecret: "" },
      "/v1/pricing/suggest",
      {},
    );
    expect(result).toBeNull();
  });
});
