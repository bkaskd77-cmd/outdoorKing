const blockedStaffDomains = new Set(["gmail.com", "googlemail.com"]);

export function isExactEmail(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  const at = normalized.indexOf("@");
  return (
    at > 0 &&
    at === normalized.lastIndexOf("@") &&
    at < normalized.length - 1 &&
    !/[\s,]/.test(normalized)
  );
}

export function isBlockedStaffDomain(domain: string): boolean {
  return blockedStaffDomains.has(domain.trim().toLowerCase());
}

/** Bootstrap address plus optional exact addresses. Domains are not accepted here. */
export function exactStaffEmails(
  bootstrap: string,
  allowlist: string | undefined,
): string[] {
  const values = [bootstrap, ...(allowlist ?? "").split(",")]
    .map((value) => value.trim().toLowerCase())
    .filter((value) => isExactEmail(value));
  return [...new Set(values)];
}

export function isAllowedStaffEmail(
  email: string,
  options: { domains: readonly string[]; exactEmails: readonly string[] },
): boolean {
  if (!isExactEmail(email)) return false;
  const normalized = email.trim().toLowerCase();
  if (options.exactEmails.includes(normalized)) return true;
  const domain = normalized.slice(normalized.lastIndexOf("@") + 1);
  if (isBlockedStaffDomain(domain)) return false;
  return options.domains.includes(domain);
}

export function magicLinkCallbackPath(magicLinkUrl: string): string {
  try {
    const callback = new URL(magicLinkUrl).searchParams.get("callbackURL") ?? "/";
    return callbackPath(callback);
  } catch {
    return "/";
  }
}

function callbackPath(callback: string): string {
  if (callback.startsWith("/") && !callback.startsWith("//")) {
    return callback.split("?")[0] || "/";
  }
  try {
    return new URL(callback).pathname || "/";
  } catch {
    return "/";
  }
}

export function isStaffLoginCallback(path: string): boolean {
  return path === "/admin" || path.startsWith("/admin/");
}

export type StaffLinkDecision = "send" | "reject" | "customer";

export function staffMagicLinkDecision(input: {
  email: string;
  magicLinkUrl: string;
  domains: readonly string[];
  exactEmails: readonly string[];
  invited: boolean;
}): StaffLinkDecision {
  if (!isStaffLoginCallback(magicLinkCallbackPath(input.magicLinkUrl))) return "customer";
  if (
    !isAllowedStaffEmail(input.email, {
      domains: input.domains,
      exactEmails: input.exactEmails,
    })
  ) {
    return "reject";
  }
  if (!input.invited) return "reject";
  return "send";
}
