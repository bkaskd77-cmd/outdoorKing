import { env } from "@ok/env/server";
import { processJob, QUEUE_NAME, type Job } from "@ok/jobs";
import { Worker } from "bullmq";
import IORedis from "ioredis";

function redisUrl(): string {
  if (env.REDIS_URL) return env.REDIS_URL;
  throw new Error("REDIS_URL is required for the BullMQ worker.");
}

const connection = new IORedis(redisUrl(), { maxRetriesPerRequest: null });

const worker = new Worker(
  QUEUE_NAME,
  async (bullJob) => {
    await processJob(bullJob.data as Job);
  },
  { connection, concurrency: 4 },
);

worker.on("failed", (job, error) => {
  console.error(`[worker] ${job?.name ?? "unknown"} failed`, error);
});

worker.on("ready", () => {
  console.info(`[worker] listening on ${QUEUE_NAME}`);
});

async function shutdown() {
  await worker.close();
  connection.disconnect();
}

process.on("SIGINT", () => {
  void shutdown().then(() => process.exit(0));
});
process.on("SIGTERM", () => {
  void shutdown().then(() => process.exit(0));
});
