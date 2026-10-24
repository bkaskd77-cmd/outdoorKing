import { describe, expect, it } from "vitest";

import { classifyIntent, isHumanHandoff } from "./classify";

const HANDOFF = [
  "chat with customer",
  "customer",
  "specialist",
  "human",
  "real person",
  "someone from the team",
  "Can I talk to a real person?",
  "Please speak to a specialist about Manaslu",
  "Call me, hand off to an agent please",
];

describe("human handoff phrases", () => {
  it.each(HANDOFF)("treats %s as a person request, not a trip", (message) => {
    expect(isHumanHandoff(message)).toBe(true);
    expect(classifyIntent(message)).toBe("human");
  });

  it("does not treat a trek question as a handoff", () => {
    expect(classifyIntent("Tell me about the Everest Base Camp trek")).toBe("trip_info");
    expect(isHumanHandoff("Tell me about Ama Dablam climbing")).toBe(false);
  });
});
