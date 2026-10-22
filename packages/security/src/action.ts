import type { ZodType } from "zod";

import { limit, type RateLimitPolicy } from "./ratelimit";

export type ActionOk<T> = { ok: true; data: T };
export type ActionErr = { ok: false; error: string };
export type ActionResult<T> = ActionOk<T> | ActionErr;

type SessionLike = { user?: { id: string; role?: string } | null };

type CreateActionOptions<TInput, TOutput> = {
  schema: ZodType<TInput>;
  permission?: string;
  rateLimit?: { key: string; policy: RateLimitPolicy };
  turnstile?: boolean;
  audit?: (input: TInput, result: TOutput) => Promise<void> | void;
  can?: (session: SessionLike, permission: string) => boolean;
  getSession?: () => Promise<SessionLike | null>;
  verifyTurnstile?: (token: string) => Promise<boolean>;
};

function readTurnstileToken(raw: unknown): string | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as Record<string, unknown>;
  const token = record.turnstileToken ?? record["cf-turnstile-response"];
  return typeof token === "string" ? token : undefined;
}

export async function parseBody(input: FormData | unknown): Promise<unknown> {
  if (input instanceof FormData) {
    const obj: Record<string, unknown> = {};
    input.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  return input;
}

export function createAction<TInput, TOutput>(
  options: CreateActionOptions<TInput, TOutput>,
  handler: (input: TInput, session: SessionLike | null) => Promise<TOutput>,
) {
  return async (raw: FormData | unknown): Promise<ActionResult<TOutput>> => {
    try {
      const body = await parseBody(raw);
      const parsed = options.schema.safeParse(body);
      if (!parsed.success) {
        return { ok: false, error: "Invalid request." };
      }

      const session = options.getSession ? await options.getSession() : null;
      if (options.permission) {
        const allowed = options.can
          ? options.can(session ?? {}, options.permission)
          : Boolean(session?.user);
        if (!allowed) return { ok: false, error: "Forbidden." };
      }

      if (options.rateLimit) {
        try {
          const result = await limit(options.rateLimit.key, options.rateLimit.policy);
          if (!result.success) return { ok: false, error: "Too many requests." };
        } catch {
          // Fail open when Redis is down so preview and CI still accept the form.
        }
      }

      if (options.turnstile) {
        const token = readTurnstileToken(body);
        if (!token || !options.verifyTurnstile) {
          return { ok: false, error: "Verification failed." };
        }
        const ok = await options.verifyTurnstile(token);
        if (!ok) return { ok: false, error: "Verification failed." };
      }

      const data = await handler(parsed.data, session);
      if (options.audit) await options.audit(parsed.data, data);
      return { ok: true, data };
    } catch {
      return { ok: false, error: "Something went wrong." };
    }
  };
}

export async function verifyTurnstileToken(
  token: string,
  secret: string,
): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  if (!res.ok) return false;
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}
