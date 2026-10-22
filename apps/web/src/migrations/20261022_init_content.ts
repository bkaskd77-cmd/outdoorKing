import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up(_args: MigrateUpArgs): Promise<void> {
  // Schema is pushed outside production (M1.1). Replaced by payload migrate:create when a DB is available.
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // no-op
}
