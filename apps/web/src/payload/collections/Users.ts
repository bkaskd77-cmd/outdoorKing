import { can, isStaff } from "@ok/auth/rbac";
import type { AuthStrategyFunction, CollectionConfig } from "payload";

const authenticateBetterAuth: AuthStrategyFunction = async ({ headers, payload }) => {
  const { auth } = await import("@ok/auth/server");
  const session = await auth.api.getSession({ headers });
  if (!session?.user || !isStaff(session.user) || !session.user.hasPasskey) {
    return { user: null };
  }

  const found = await payload.find({
    collection: "users",
    where: {
      or: [
        { betterAuthUserId: { equals: session.user.id } },
        { email: { equals: session.user.email } },
      ],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const doc = found.docs[0];
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
