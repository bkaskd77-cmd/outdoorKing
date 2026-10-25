import { createHash, randomBytes } from "node:crypto";

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
import {
  isAllowedStaffEmail,
  isStaffLoginCallback,
  magicLinkCallbackPath,
  staffMagicLinkDecision,
} from "@ok/env/staff-email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, magicLink, twoFactor } from "better-auth/plugins";
import { and, eq, gt, isNull } from "drizzle-orm";

import { isStaff } from "./rbac";

async function resendFailure(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { name?: unknown; message?: unknown };
    const message = typeof body.message === "string" ? body.message.toLowerCase() : "";
    if (message.includes("verif") || message.includes("domain is not")) {
      return "domain_not_verified";
    }
    if (typeof body.name === "string" && /^[a-z0-9_]+$/i.test(body.name))
      return body.name;
  } catch {
    return `http_${response.status}`;
  }
  return `http_${response.status}`;
}

async function redisClient() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
}

function isStaffEmail(email: string): boolean {
  return isAllowedStaffEmail(email, {
    domains: env.STAFF_EMAIL_DOMAINS_LIST,
    exactEmails: env.STAFF_EXACT_EMAILS,
  });
}

async function canSendStaffLink(email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  if (!isStaffEmail(normalized)) return false;
  const [existing] = await db
    .select({ role: user.role })
    .from(user)
    .where(eq(user.email, normalized))
    .limit(1);
  if (existing) return isStaff({ role: existing.role });
  await ensureBootstrapInvite();
  const now = new Date();
  const [pending] = await db
    .select({ id: invite.id })
    .from(invite)
    .where(
      and(
        eq(invite.email, normalized),
        isNull(invite.acceptedAt),
        gt(invite.expiresAt, now),
      ),
    )
    .limit(1);
  return Boolean(pending);
}

async function ensureBootstrapInvite(): Promise<void> {
  const email = env.BOOTSTRAP_SUPER_ADMIN_EMAIL.trim().toLowerCase();
  if (!email || !isStaffEmail(email)) return;
  const now = new Date();
  const existingUser = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);
  if (existingUser[0]) return;
  const pending = await db
    .select({ id: invite.id })
    .from(invite)
    .where(
      and(eq(invite.email, email), isNull(invite.acceptedAt), gt(invite.expiresAt, now)),
    )
    .limit(1);
  if (pending[0]) return;
  const token = randomBytes(32).toString("hex");
  await db.insert(invite).values({
    id: randomBytes(16).toString("hex"),
    email,
    role: "super_admin",
    tokenHash: createHash("sha256").update(token).digest("hex"),
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  });
}

async function assertStaffInvite(email: string): Promise<{ role: string }> {
  if (!isStaffEmail(email)) {
    throw new Error("This email domain is not invited to staff access.");
  }
  await ensureBootstrapInvite();
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
        async after(created) {
          if (!created.email) return;
          await db
            .update(invite)
            .set({ acceptedAt: new Date() })
            .where(
              and(
                eq(invite.email, created.email.toLowerCase()),
                isNull(invite.acceptedAt),
              ),
            );
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
        const staffLogin = isStaffLoginCallback(magicLinkCallbackPath(url));
        const decision = staffMagicLinkDecision({
          email,
          magicLinkUrl: url,
          domains: env.STAFF_EMAIL_DOMAINS_LIST,
          exactEmails: env.STAFF_EXACT_EMAILS,
          invited: staffLogin ? await canSendStaffLink(email) : false,
        });
        if (decision === "reject") {
          throw new Error("This email is not invited to staff access.");
        }
        if (env.AI_MOCK || env.NODE_ENV === "test") {
          console.info(`[auth] magic link for ${email}: ${url}`);
          return;
        }
        const response = await fetch("https://api.resend.com/emails", {
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
        if (!response.ok) {
          const failure = await resendFailure(response);
          console.error(`[auth] sign-in email was not accepted (${failure})`);
          throw new Error("Unable to send a sign-in link.");
        }
      },
    }),
    admin(),
  ],
});

export async function ensurePasskeyFlag(
  userId: string,
  already: boolean | undefined,
): Promise<boolean> {
  if (already) return true;
  const [key] = await db
    .select({ id: passkeyTable.id })
    .from(passkeyTable)
    .where(eq(passkeyTable.userId, userId))
    .limit(1);
  if (!key) return false;
  await db.update(user).set({ hasPasskey: true }).where(eq(user.id, userId));
  return true;
}

export { assertStaffInvite };
