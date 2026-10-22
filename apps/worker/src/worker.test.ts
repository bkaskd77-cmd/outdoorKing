import { describe, expect, it } from "vitest";

import { QUEUE_NAME } from "@ok/jobs";

describe("BullMQ worker", () => {
  it("uses the shared queue name", () => {
    expect(QUEUE_NAME).toBe("outdoorking");
  });
});
