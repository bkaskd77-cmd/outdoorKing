import { env } from "@ok/env/server";

import type { QueueDriver } from "./types";

export function resolveQueueDriver(): QueueDriver {
  if (env.QUEUE_DRIVER === "bullmq" && !env.REDIS_URL) return "inline";
  if (env.QUEUE_DRIVER === "qstash" && !env.QSTASH_TOKEN) return "inline";
  return env.QUEUE_DRIVER;
}

export function jobsSigningSecret(): string {
  return env.QSTASH_CURRENT_SIGNING_KEY || env.QSTASH_TOKEN || env.PAYLOAD_SECRET;
}
