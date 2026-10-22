import { can } from "@ok/auth/rbac";
import type { Access, CollectionConfig } from "payload";

const staffDraft: Access = ({ req }) =>
  can({ role: req.user?.role as string | undefined }, "content:read_draft");

export const Faqs: CollectionConfig = {
  slug: "faqs",
  versions: { drafts: true },
  admin: { useAsTitle: "question" },
  access: {
    read: ({ req }) =>
      can({ role: req.user?.role as string | undefined }, "content:read_draft") || {
        _status: { equals: "published" },
      },
    create: ({ req }) =>
      can({ role: req.user?.role as string | undefined }, "content:write_draft"),
    update: ({ req }) =>
      can({ role: req.user?.role as string | undefined }, "content:write_draft"),
    delete: staffDraft,
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === "update" && data._status === "published") {
          if (!can({ role: req.user?.role as string | undefined }, "content:publish")) {
            throw new Error("Publishing is not allowed for this role.");
          }
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "answer", type: "textarea", required: true },
    { name: "category", type: "text" },
    {
      name: "sources",
      type: "array",
      fields: [
        { name: "url", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "accessedAt", type: "text" },
        { name: "note", type: "text" },
      ],
    },
  ],
};
