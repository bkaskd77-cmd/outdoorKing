import * as migration_20261022_init_content from "./20261022_init_content";

export const migrations = [
  {
    up: migration_20261022_init_content.up,
    down: migration_20261022_init_content.down,
    name: "20261022_init_content",
  },
];
