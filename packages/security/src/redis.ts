import { env } from "@ok/env/server";

export async function pingRedis(): Promise<void> {
  if (env.REDIS_URL) {
    const IORedis = (await import("ioredis")).default;
    const client = new IORedis(env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      connectTimeout: 1500,
    });
    try {
      await client.connect();
      const pong = await client.ping();
      if (pong !== "PONG" && pong !== "pong") {
        throw new Error("redis");
      }
    } finally {
      client.disconnect();
    }
    return;
  }

  const redis = await fetch(`${env.UPSTASH_REDIS_REST_URL}/ping`, {
    headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}` },
  });
  if (!redis.ok) throw new Error("redis");
}
