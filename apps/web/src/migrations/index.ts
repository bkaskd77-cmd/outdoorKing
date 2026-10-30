import * as migration_20261023_150136_init_content from './20261023_150136_init_content';
import * as migration_20261029_191500_catalog_fields from './20261029_191500_catalog_fields';
import * as migration_20261029_191600_catalog_fields_data from './20261029_191600_catalog_fields_data';
import * as migration_20261030_100000_itinerary_fixes from './20261030_100000_itinerary_fixes';
import * as migration_20261030_110000_page_copy from './20261030_110000_page_copy';
import * as migration_20261030_120000_trip_copy from './20261030_120000_trip_copy';
import * as migration_20261030_130000_trip_overviews from './20261030_130000_trip_overviews';
import * as migration_20261030_140000_lowland_regions from './20261030_140000_lowland_regions';
import * as migration_20261030_161226_media_sizes from './20261030_161226_media_sizes';

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
  {
    up: migration_20261030_110000_page_copy.up,
    down: migration_20261030_110000_page_copy.down,
    name: '20261030_110000_page_copy',
  },
  {
    up: migration_20261030_120000_trip_copy.up,
    down: migration_20261030_120000_trip_copy.down,
    name: '20261030_120000_trip_copy',
  },
  {
    up: migration_20261030_130000_trip_overviews.up,
    down: migration_20261030_130000_trip_overviews.down,
    name: '20261030_130000_trip_overviews',
  },
  {
    up: migration_20261030_140000_lowland_regions.up,
    down: migration_20261030_140000_lowland_regions.down,
    name: '20261030_140000_lowland_regions',
  },
  {
    up: migration_20261030_161226_media_sizes.up,
    down: migration_20261030_161226_media_sizes.down,
    name: '20261030_161226_media_sizes',
  },
];
