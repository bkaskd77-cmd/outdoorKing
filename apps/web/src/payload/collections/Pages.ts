import { can } from "@ok/auth/rbac";
import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  versions: { drafts: true },
  admin: { useAsTitle: "title" },
  access: {
    read: ({ req }) =>
      can({ role: req.user?.role as string | undefined }, "content:read_draft") || {
        _status: { equals: "published" },
      },
    create: ({ req }) =>
      can({ role: req.user?.role as string | undefined }, "content:write_draft"),
    update: ({ req }) =>
      can({ role: req.user?.role as string | undefined }, "content:write_draft"),
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "body", type: "textarea" },
  ],
};
