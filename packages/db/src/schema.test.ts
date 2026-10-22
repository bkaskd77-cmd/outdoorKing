import { describe, expect, it } from "vitest";

import { auditLog, contentChunks, invite, user } from "./schema/index";

describe("app schema", () => {
  it("exports Phase 0 tables", () => {
    expect(user).toBeTruthy();
    expect(invite).toBeTruthy();
    expect(auditLog).toBeTruthy();
    expect(contentChunks).toBeTruthy();
  });
});
