import { auth } from "@ok/auth/server";
import { headers } from "next/headers";

export type AuthSession = {
  user: { id: string; email?: string | null; role?: string };
} | null;

export async function getAuthSession(): Promise<AuthSession> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return null;
    const user = session.user as typeof session.user & { role?: string | null };
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role ?? undefined,
      },
    };
  } catch {
    return null;
  }
}
