export const aliases = {
  "content.write": {
    primary: "anthropic/claude-sonnet-4-5",
    fallbacks: ["openai/gpt-4.1", "google/gemini-2.5-pro"],
  },
  "content.factcheck": {
    primary: "openai/gpt-4.1",
    fallbacks: ["google/gemini-2.5-pro", "anthropic/claude-sonnet-4-5"],
  },
  embed: {
    primary: "openai/text-embedding-3-small",
    fallbacks: [],
  },
} as const;

export type Alias = keyof typeof aliases;
