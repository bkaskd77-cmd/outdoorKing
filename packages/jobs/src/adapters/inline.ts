import { processJob } from "../handlers";
import type { Job } from "../types";

export async function enqueueInline(job: Job): Promise<void> {
  await processJob(job);
}
