export type RateLimitPolicy = {
  name: string;
  limit: number;
  windowMs: number;
};

export const policies = {
  global: { name: "global", limit: 300, windowMs: 5 * 60 * 1000 },
  signIn: { name: "signIn", limit: 5, windowMs: 60 * 1000 },
  signInHour: { name: "signInHour", limit: 20, windowMs: 60 * 60 * 1000 },
  magicLink: { name: "magicLink", limit: 3, windowMs: 60 * 60 * 1000 },
  tripRequest: { name: "tripRequest", limit: 5, windowMs: 60 * 60 * 1000 },
  aiDesignerAnon: { name: "aiDesignerAnon", limit: 10, windowMs: 24 * 60 * 60 * 1000 },
  aiDesignerCustomer: {
    name: "aiDesignerCustomer",
    limit: 30,
    windowMs: 24 * 60 * 60 * 1000,
  },
  concierge: { name: "concierge", limit: 30, windowMs: 60 * 60 * 1000 },
  payloadPublic: { name: "payloadPublic", limit: 120, windowMs: 60 * 1000 },
} as const satisfies Record<string, RateLimitPolicy>;

export type PolicyName = keyof typeof policies;

type LimitResult = { success: boolean; remaining: number; reset: number };

type WindowState = { count: number; reset: number };

const memory = new Map<string, WindowState>();

function memoryLimit(key: string, policy: RateLimitPolicy): LimitResult {
  const now = Date.now();
  const current = memory.get(key);
  if (!current || current.reset <= now) {
    const next = { count: 1, reset: now + policy.windowMs };
    memory.set(key, next);
    return { success: true, remaining: policy.limit - 1, reset: next.reset };
  }
  if (current.count >= policy.limit) {
    return { success: false, remaining: 0, reset: current.reset };
  }
  current.count += 1;
  return { success: true, remaining: policy.limit - current.count, reset: current.reset };
}

export async function limit(key: string, policy: RateLimitPolicy): Promise<LimitResult> {
  const memoryKey = `${policy.name}:${key}`;
  if (process.env.NODE_ENV === "test" || process.env.AI_MOCK === "1") {
    return memoryLimit(memoryKey, policy);
  }

  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    const { env } = await import("@ok/env/server");

    const redis = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    });
    const limiter = new Ratelimit({
      redis,
      prefix: `${env.RATE_LIMIT_PREFIX}${policy.name}`,
      limiter: Ratelimit.slidingWindow(
        policy.limit,
        `${Math.ceil(policy.windowMs / 1000)} s`,
      ),
    });
    const result = await Promise.race([
      limiter.limit(key),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("rate limit backend timeout")), 250);
      }),
    ]);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch {
    return memoryLimit(memoryKey, policy);
  }
}

export function shouldSkipRateLimit(pathname: string): boolean {
  return (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/api/payments/webhook") ||
    /\.(?:png|jpe?g|webp|avif|svg|ico|woff2?)$/.test(pathname)
  );
}
