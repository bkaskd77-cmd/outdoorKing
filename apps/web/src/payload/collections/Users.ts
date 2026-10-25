import { can, isRole, isStaff } from "@ok/auth/rbac";
import type { AuthStrategyFunction, CollectionConfig } from "payload";

const payloadRoles = [
  "content_editor",
  "sales",
  "ops",
  "finance",
  "admin",
  "super_admin",
  "ai_agent",
] as const;

type PayloadRole = (typeof payloadRoles)[number];

function payloadRole(role: string | null | undefined): PayloadRole {
  if (role && isRole(role) && payloadRoles.includes(role as PayloadRole)) {
    return role as PayloadRole;
  }
  return "content_editor";
}

const linkingStaff = new Set<string>();

const authenticateBetterAuth: AuthStrategyFunction = async ({ headers, payload }) => {
  const { auth, ensurePasskeyFlag } = await import("@ok/auth/server");
  const session = await auth.api.getSession({ headers });
  const sessionUser = session?.user as
    | {
        id: string;
        email: string;
        name?: string | null;
        role?: string | null;
        hasPasskey?: boolean;
      }
    | undefined;
  if (!sessionUser?.email || !isStaff(sessionUser)) {
    return { user: null };
  }

  if (linkingStaff.has(sessionUser.id)) {
    return { user: null };
  }
  linkingStaff.add(sessionUser.id);
  try {
    const passkeyReady = await ensurePasskeyFlag(sessionUser.id, sessionUser.hasPasskey);
    if (!passkeyReady) return { user: null };

    const found = await payload.find({
      collection: "users",
      where: {
        or: [
          { betterAuthUserId: { equals: sessionUser.id } },
          { email: { equals: sessionUser.email } },
        ],
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    let doc = found.docs[0];
    if (doc && !doc.betterAuthUserId) {
      doc = await payload.update({
        collection: "users",
        id: doc.id,
        overrideAccess: true,
        data: { betterAuthUserId: sessionUser.id },
      });
    }
    if (!doc) {
      try {
        doc = await payload.create({
          collection: "users",
          overrideAccess: true,
          data: {
            email: sessionUser.email,
            name: sessionUser.name ?? undefined,
            role: payloadRole(sessionUser.role),
            betterAuthUserId: sessionUser.id,
          },
        });
      } catch {
        const again = await payload.find({
          collection: "users",
          where: {
            or: [
              { betterAuthUserId: { equals: sessionUser.id } },
              { email: { equals: sessionUser.email } },
            ],
          },
          limit: 1,
          depth: 0,
          overrideAccess: true,
        });
        doc = again.docs[0];
      }
    }
    if (!doc) {
      return { user: null };
    }

    return {
      user: {
        ...doc,
        collection: "users",
        _strategy: "better-auth",
      },
    };
  } finally {
    linkingStaff.delete(sessionUser.id);
  }
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    disableLocalStrategy: true,
    strategies: [
      {
        name: "better-auth",
        authenticate: authenticateBetterAuth,
      },
    ],
  },
  admin: {
    useAsTitle: "email",
    hidden: ({ user }) =>
      !can({ role: user?.role as string | undefined }, "user:role_change"),
  },
  access: {
    read: ({ req }) => can({ role: req.user?.role as string | undefined }, "audit:read"),
    create: ({ req }) =>
      can({ role: req.user?.role as string | undefined }, "user:role_change"),
    update: ({ req }) =>
      can({ role: req.user?.role as string | undefined }, "user:role_change"),
    delete: ({ req }) =>
      can({ role: req.user?.role as string | undefined }, "user:role_change"),
    admin: ({ req }) => isStaff({ role: req.user?.role as string | undefined }),
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true },
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      defaultValue: "content_editor",
      options: [
        { label: "Content editor", value: "content_editor" },
        { label: "Sales", value: "sales" },
        { label: "Ops", value: "ops" },
        { label: "Finance", value: "finance" },
        { label: "Admin", value: "admin" },
        { label: "Super admin", value: "super_admin" },
        { label: "AI agent", value: "ai_agent" },
      ],
      admin: { readOnly: true },
    },
    { name: "betterAuthUserId", type: "text", unique: true, admin: { readOnly: true } },
  ],
};
