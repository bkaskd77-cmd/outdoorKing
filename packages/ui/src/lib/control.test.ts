import { describe, expect, it } from "vitest";

import { chipClass, listControlClass } from "./control";

describe("chipClass", () => {
  it("keeps selected chips filled when not hovered", () => {
    const selected = chipClass(true);
    expect(selected).toContain("bg-primary");
    expect(selected).toContain("text-primary-foreground");
    expect(selected).toContain("hover:bg-primary-hover");
    expect(selected).not.toContain("hover:bg-muted");
  });

  it("fills idle chips only on hover", () => {
    const idle = chipClass(false);
    expect(idle).toContain("hover:bg-muted");
    expect(idle).not.toContain("bg-primary");
  });
});

describe("listControlClass", () => {
  it("marks the active row without unfilling on hover", () => {
    expect(listControlClass(true)).toContain("bg-muted");
    expect(listControlClass(true)).toContain("font-semibold");
  });
});
