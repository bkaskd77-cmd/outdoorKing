import { env } from "@ok/env/server";

import { aliases, type Alias } from "./models.config";

export type RouterResult = {
  alias: Alias;
  model: string;
  text: string;
  mocked: boolean;
};

export async function runAlias(
  alias: Alias,
  prompt: string,
  mockOutput?: string,
): Promise<RouterResult> {
  const spec = aliases[alias];
  if (env.AI_MOCK) {
    return {
      alias,
      model: "mock",
      text: mockOutput ?? `[mock:${alias}] ${prompt.slice(0, 200)}`,
      mocked: true,
    };
  }

  const { generateText } = await import("ai");
  const { gateway } = await import("@ai-sdk/gateway");

  try {
    const result = await generateText({
      model: gateway(spec.primary),
      prompt,
    });
    return { alias, model: spec.primary, text: result.text, mocked: false };
  } catch (error) {
    const fallback = spec.fallbacks[0];
    if (!fallback) throw error;
    const result = await generateText({
      model: gateway(fallback),
      prompt,
    });
    return { alias, model: fallback, text: result.text, mocked: false };
  }
}
