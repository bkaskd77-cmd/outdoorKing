import { describe, expect, it } from "vitest";

import { runAlias } from "./router";

describe("AI router", () => {
  it("returns fixtures when AI_MOCK=1", async () => {
    const result = await runAlias("content.write", "Write an FAQ", "fixture");
    expect(result.mocked).toBe(true);
    expect(result.text).toBe("fixture");
  });
});
