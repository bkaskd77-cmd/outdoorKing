import { env } from "@ok/env/server";

import { enqueueInline } from "./inline";
import type { Job } from "../types";

const QUEUE_NAME = "outdoorking";

export function bullmqConnectionOptions() {
  return {
    url: env.REDIS_URL,
    maxRetriesPerRequest: null as null,
  };
}

export async function enqueueBullmq(job: Job): Promise<void> {
  if (!env.REDIS_URL) {
    await enqueueInline(job);
    return;
  }
  const { Queue } = await import("bullmq");
  const IORedis = (await import("ioredis")).default;
  const connection = new IORedis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
    lazyConnect: true,
  });
  try {
    const queue = new Queue(QUEUE_NAME, { connection });
    await queue.add(job.name, job, {
      attempts: 5,
      backoff: { type: "exponential", delay: 2000 },
      removeOnComplete: 100,
      removeOnFail: 200,
    });
    await queue.close();
  } finally {
    connection.disconnect();
  }
}

export { QUEUE_NAME };
