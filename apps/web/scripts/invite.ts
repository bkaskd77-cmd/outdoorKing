import { db, invite } from "@ok/db";
import { env } from "@ok/env/server";
import { isAllowedStaffEmail } from "@ok/env/staff-email";
import { createHash, randomBytes } from "node:crypto";

const [, , emailArg, roleArg] = process.argv;

if (!emailArg || !roleArg) {
  console.error("Usage: pnpm --filter web invite <email> <role>");
  process.exit(1);
}

const email = emailArg.toLowerCase();
const role = roleArg;
if (
  !isAllowedStaffEmail(email, {
    domains: env.STAFF_EMAIL_DOMAINS_LIST,
    exactEmails: env.STAFF_EXACT_EMAILS,
  })
) {
  console.error("That email is not invited to staff access.");
  process.exit(1);
}

const token = randomBytes(32).toString("hex");
const tokenHash = createHash("sha256").update(token).digest("hex");

await db.insert(invite).values({
  id: randomBytes(16).toString("hex"),
  email,
  role,
  tokenHash,
  expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
});

console.log(`Invite created for ${email} as ${role}.`);
console.log("Share the magic-link login after the user is created via Better Auth.");
