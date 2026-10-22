import { neon } from "@neondatabase/serverless";
import { env } from "@ok/env/server";
import { sql } from "drizzle-orm";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schema/index";

export type AppSchema = typeof schema;

function createClient() {
  if (env.DATABASE_DRIVER === "neon") {
    const sql = neon(env.DATABASE_URL);
    return drizzleNeon(sql, { schema });
  }
  const pool = new pg.Pool({
    connectionString: env.DATABASE_URL,
    max: env.NODE_ENV === "production" ? 10 : 4,
  });
  return drizzlePg(pool, { schema });
}

export const db = createClient();
export { schema };

export async function pingDatabase(): Promise<void> {
  await db.execute(sql`select 1`);
}
