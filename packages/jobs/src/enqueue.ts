import { enqueueBullmq } from "./adapters/bullmq";
import { enqueueInline } from "./adapters/inline";
import { enqueueQstash } from "./adapters/qstash";
import { resolveQueueDriver } from "./driver";
import type { Job } from "./types";

export async function enqueue(job: Job): Promise<void> {
  const driver = resolveQueueDriver();
  if (driver === "bullmq") {
    await enqueueBullmq(job);
    return;
  }
  if (driver === "qstash") {
    await enqueueQstash(job);
    return;
  }
  await enqueueInline(job);
}
