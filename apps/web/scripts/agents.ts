import { runPipeline, type ContentType } from "@ok/content-agents";
import { getPayload } from "payload";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import config from "../src/payload.config";

function arg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx === -1 ? undefined : process.argv[idx + 1];
}

const type = (arg("--type") ?? "faq") as ContentType;
const slug = arg("--slug") ?? "what-is-tims";
const here = dirname(fileURLToPath(import.meta.url));
const runsDir = resolve(here, "../../../packages/content-agents/runs");

const payload = await getPayload({ config });

const result = await runPipeline({
  type,
  slug,
  runsDir,
  writer: {
    async createDraft(draft) {
      const doc = await payload.create({
        collection: "faqs",
        draft: true,
        overrideAccess: false,
        user: {
          id: "ai_agent",
          email: "ai@outdoorking.com",
          collection: "users",
          role: "ai_agent",
        },
        data: {
          question: draft.title,
          slug: draft.slug,
          answer: draft.body,
          sources: draft.sources,
        },
      });
      return { id: String(doc.id) };
    },
  },
});

console.log(
  JSON.stringify({ ...result, publishAllowed: result.publishAllowed }, null, 2),
);
if (result.publishAllowed) process.exit(2);
