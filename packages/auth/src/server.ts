import { passkey } from "@better-auth/passkey";
import { brand } from "@ok/config";
import {
  account,
  db,
  invite,
  passkey as passkeyTable,
  session,
  twoFactor as twoFactorTable,
  user,
  verification,
} from "@ok/db";
import { env } from "@ok/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, magicLink, twoFactor } from "better-auth/plugins";
import { and, eq, gt, isNull } from "drizzle-orm";

async function redisClient() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
}

function emailDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase() ?? "";
}

function isStaffEmail(email: string): boolean {
  return env.STAFF_EMAIL_DOMAINS_LIST.includes(emailDomain(email));
}

async function assertStaffInvite(email: string): Promise<{ role: string }> {
  if (!isStaffEmail(email)) {
    throw new Error("This email domain is not invited to staff access.");
  }
  const now = new Date();
  const rows = await db
    .select()
    .from(invite)
    .where(
      and(
        eq(invite.email, email.toLowerCase()),
        isNull(invite.acceptedAt),
        gt(invite.expiresAt, now),
      ),
    )
    .limit(1);
  if (!rows[0]) {
    throw new Error("No valid invite found for this email.");
  }
  return { role: rows[0].role };
}

export const auth = betterAuth({
  appName: brand.name,
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: env.AUTH_TRUSTED_ORIGINS_LIST,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      twoFactor: twoFactorTable,
      passkey: passkeyTable,
    },
  }),
  user: {
    additionalFields: {
      hasPasskey: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
      },
    },
  },
  emailAndPassword: { enabled: false },
  session: {
    expiresIn: 60 * 60 * 12,
    updateAge: 60 * 30,
  },
  advanced: {
    cookiePrefix: "ok",
    useSecureCookies: env.NODE_ENV !== "development" && env.NODE_ENV !== "test",
  },
  rateLimit: { storage: "secondary-storage" },
  secondaryStorage: {
    async get(key) {
      const redis = await redisClient();
      const value = await redis.get<string>(key);
      return value ?? null;
    },
    async getAndDelete(key) {
      const redis = await redisClient();
      const value = await redis.get<string>(key);
      await redis.del(key);
      return value ?? null;
    },
    async increment(key, ttl) {
      const redis = await redisClient();
      const count = await redis.incr(key);
      if (count === 1) await redis.expire(key, ttl);
      return count;
    },
    async set(key, value, ttl) {
      const redis = await redisClient();
      if (ttl) await redis.set(key, value, { ex: ttl });
      else await redis.set(key, value);
    },
    async delete(key) {
      const redis = await redisClient();
      await redis.del(key);
    },
  },
  databaseHooks: {
    user: {
      create: {
        async before(created) {
          if (isStaffEmail(created.email)) {
            const invited = await assertStaffInvite(created.email);
            return { data: { ...created, role: invited.role } };
          }
          return { data: { ...created, role: "customer" } };
        },
      },
    },
  },
  plugins: [
    passkey({
      rpID: env.AUTH_RP_ID,
      rpName: brand.name,
    }),
    twoFactor(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        if (env.AI_MOCK || env.NODE_ENV === "test") {
          console.info(`[auth] magic link for ${email}: ${url}`);
          return;
        }
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: env.EMAIL_FROM,
            to: [email],
            subject: "Your OutdoorKing sign-in link",
            text: `Open this link to view your private quotes:\n${url}\n`,
          }),
        });
      },
    }),
    admin(),
  ],
});

export { assertStaffInvite };
