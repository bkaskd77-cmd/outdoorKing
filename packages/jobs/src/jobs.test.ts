import { describe, expect, it, vi } from "vitest";

import { signJobBody, verifyJobSignature } from "./adapters/qstash";
import { resolveQueueDriver } from "./driver";
import { enqueue } from "./enqueue";
import { processJob } from "./handlers";

describe("jobs adapters", () => {
  it("defaults to the inline driver in tests", () => {
    expect(resolveQueueDriver()).toBe("inline");
  });

  it("runs email.send inline without calling Resend", async () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => undefined);
    await enqueue({
      name: "email.send",
      payload: {
        to: "guest@example.com",
        subject: "We have your trip request",
        html: "<p>Private quote only.</p>",
      },
    });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("processJob shares handlers with the worker", async () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => undefined);
    await processJob({
      name: "email.send",
      payload: { to: "ops@example.com", subject: "Handoff", html: "<p>ok</p>" },
    });
    expect(spy.mock.calls.some((call) => String(call[0]).includes("[mail]"))).toBe(true);
    spy.mockRestore();
  });

  it("signs and verifies QStash callback bodies", () => {
    const body = JSON.stringify({ name: "email.send" });
    const signature = signJobBody(body, "test-secret");
    expect(verifyJobSignature(body, signature, "test-secret")).toBe(true);
    expect(verifyJobSignature(body, "deadbeef", "test-secret")).toBe(false);
    expect(verifyJobSignature(body, null, "test-secret")).toBe(false);
  });
});
