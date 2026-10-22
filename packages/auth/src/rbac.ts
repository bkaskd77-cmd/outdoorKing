export const roles = [
  "customer",
  "content_editor",
  "sales",
  "ops",
  "finance",
  "admin",
  "super_admin",
  "ai_agent",
  "intel_service",
] as const;

export type Role = (typeof roles)[number];

export const permissions = [
  "content:read_draft",
  "content:write_draft",
  "content:publish",
  "company_facts:write",
  "review:create",
  "lead:read",
  "lead:read_all",
  "quote:draft",
  "quote:send",
  "booking:read",
  "document:read_private",
  "payment:mark_wire",
  "pii:export",
  "user:role_change",
  "audit:read",
] as const;

export type Permission = (typeof permissions)[number];

const matrix: Record<Role, readonly Permission[]> = {
  customer: ["lead:read", "booking:read", "document:read_private"],
  content_editor: ["content:read_draft", "content:write_draft", "content:publish"],
  sales: [
    "content:read_draft",
    "lead:read",
    "lead:read_all",
    "quote:draft",
    "quote:send",
    "booking:read",
  ],
  ops: [
    "content:read_draft",
    "lead:read",
    "lead:read_all",
    "booking:read",
    "document:read_private",
  ],
  finance: ["booking:read", "payment:mark_wire"],
  admin: [
    "content:read_draft",
    "content:write_draft",
    "content:publish",
    "company_facts:write",
    "review:create",
    "lead:read",
    "lead:read_all",
    "quote:draft",
    "quote:send",
    "booking:read",
    "document:read_private",
    "payment:mark_wire",
    "pii:export",
    "audit:read",
  ],
  super_admin: permissions,
  ai_agent: ["content:read_draft", "content:write_draft", "quote:draft"],
  intel_service: ["lead:read", "booking:read"],
};

export type Principal = {
  id?: string;
  role?: string | null;
  email?: string | null;
  hasPasskey?: boolean;
};

export function isRole(value: string | null | undefined): value is Role {
  return roles.includes(value as Role);
}

export function isStaff(user: Principal | null | undefined): boolean {
  if (!user?.role) return false;
  return (
    user.role === "content_editor" ||
    user.role === "sales" ||
    user.role === "ops" ||
    user.role === "finance" ||
    user.role === "admin" ||
    user.role === "super_admin"
  );
}

export function can(user: Principal | null | undefined, permission: Permission): boolean {
  if (!user?.role || !isRole(user.role)) return false;
  return matrix[user.role].includes(permission);
}

export function grants(role: Role): readonly Permission[] {
  return matrix[role];
}
