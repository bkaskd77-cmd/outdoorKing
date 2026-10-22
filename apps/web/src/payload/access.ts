import { can, isStaff, type Permission } from "@ok/auth/rbac";
import type { Access, FieldAccess } from "payload";

type RoleUser = { role?: string | null };

export function roleOf(user: unknown): string | undefined {
  if (!user || typeof user !== "object") return undefined;
  const role = (user as RoleUser).role;
  return typeof role === "string" ? role : undefined;
}

export function hasPermission(user: unknown, permission: Permission): boolean {
  return can({ role: roleOf(user) }, permission);
}

export const staffDraftOrPublished: Access = ({ req }) => {
  if (hasPermission(req.user, "content:read_draft")) return true;
  return { _status: { equals: "published" } };
};

export const staffWrite: Access = ({ req }) =>
  hasPermission(req.user, "content:write_draft");

export const staffDelete: Access = ({ req }) =>
  hasPermission(req.user, "content:write_draft");

export const denyAiAgent: Access = ({ req }) => {
  if (roleOf(req.user) === "ai_agent") return false;
  return hasPermission(req.user, "content:write_draft");
};

export const companyFactsWrite: Access = ({ req }) => {
  if (roleOf(req.user) === "ai_agent") return false;
  return hasPermission(req.user, "company_facts:write");
};

export const reviewCreate: Access = ({ req }) => {
  if (roleOf(req.user) === "ai_agent") return false;
  return (
    hasPermission(req.user, "review:create") ||
    hasPermission(req.user, "content:write_draft")
  );
};

export const staffOnlyField: FieldAccess = ({ req }) =>
  isStaff({ role: roleOf(req.user) });

export const financeField: FieldAccess = ({ req }) =>
  hasPermission(req.user, "finance:read");

export function assertCanPublish(user: unknown): void {
  if (!hasPermission(user, "content:publish")) {
    throw new Error("Publishing is not allowed for this role.");
  }
}
