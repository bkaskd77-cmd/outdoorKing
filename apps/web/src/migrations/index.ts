import * as migration_20261023_150136_init_content from './20261023_150136_init_content';
import * as migration_20261029_191500_catalog_fields from './20261029_191500_catalog_fields';
import * as migration_20261029_191600_catalog_fields_data from './20261029_191600_catalog_fields_data';
import * as migration_20261030_100000_itinerary_fixes from './20261030_100000_itinerary_fixes';

export const migrations = [
  {
    up: migration_20261023_150136_init_content.up,
    down: migration_20261023_150136_init_content.down,
    name: '20261023_150136_init_content',
  },
  {
    up: migration_20261029_191500_catalog_fields.up,
    down: migration_20261029_191500_catalog_fields.down,
    name: '20261029_191500_catalog_fields',
  },
  {
    up: migration_20261029_191600_catalog_fields_data.up,
    down: migration_20261029_191600_catalog_fields_data.down,
    name: '20261029_191600_catalog_fields_data',
  },
  {
    up: migration_20261030_100000_itinerary_fixes.up,
    down: migration_20261030_100000_itinerary_fixes.down,
    name: '20261030_100000_itinerary_fixes',
  },
];
