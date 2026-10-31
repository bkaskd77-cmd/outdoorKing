import * as migration_20261023_150136_init_content from './20261023_150136_init_content';
import * as migration_20261029_191500_catalog_fields from './20261029_191500_catalog_fields';
import * as migration_20261029_191550_prepare_localized_content from './20261029_191550_prepare_localized_content';
import * as migration_20261029_191600_catalog_fields_data from './20261029_191600_catalog_fields_data';
import * as migration_20261030_100000_itinerary_fixes from './20261030_100000_itinerary_fixes';
import * as migration_20261030_110000_page_copy from './20261030_110000_page_copy';
import * as migration_20261030_120000_trip_copy from './20261030_120000_trip_copy';
import * as migration_20261030_130000_trip_overviews from './20261030_130000_trip_overviews';
import * as migration_20261030_140000_lowland_regions from './20261030_140000_lowland_regions';
import * as migration_20261030_161226_media_sizes from './20261030_161226_media_sizes';
import * as migration_20261030_170000_day_copy from './20261030_170000_day_copy';
import * as migration_20261030_180000_place_copy from './20261030_180000_place_copy';
import * as migration_20261030_190000_peak_description from './20261030_190000_peak_description';
import * as migration_20261030_200000_permits_peaks from './20261030_200000_permits_peaks';
import * as migration_20261030_210000_permit_fees from './20261030_210000_permit_fees';
import * as migration_20261030_220000_guides from './20261030_220000_guides';
import * as migration_20261031_100000_faqs from './20261031_100000_faqs';
import * as migration_20261031_110000_about from './20261031_110000_about';
import * as migration_20261031_120000_trust_pages from './20261031_120000_trust_pages';
import * as migration_20261031_130000_localize_content from './20261031_130000_localize_content';
import * as migration_20261031_140000_german_pages from './20261031_140000_german_pages';

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
    up: migration_20261029_191550_prepare_localized_content.up,
    down: migration_20261029_191550_prepare_localized_content.down,
    name: '20261029_191550_prepare_localized_content',
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
  {
    up: migration_20261030_170000_day_copy.up,
    down: migration_20261030_170000_day_copy.down,
    name: '20261030_170000_day_copy',
  },
  {
    up: migration_20261030_180000_place_copy.up,
    down: migration_20261030_180000_place_copy.down,
    name: '20261030_180000_place_copy',
  },
  {
    up: migration_20261030_190000_peak_description.up,
    down: migration_20261030_190000_peak_description.down,
    name: '20261030_190000_peak_description',
  },
  {
    up: migration_20261030_200000_permits_peaks.up,
    down: migration_20261030_200000_permits_peaks.down,
    name: '20261030_200000_permits_peaks',
  },
  {
    up: migration_20261030_210000_permit_fees.up,
    down: migration_20261030_210000_permit_fees.down,
    name: '20261030_210000_permit_fees',
  },
  {
    up: migration_20261030_220000_guides.up,
    down: migration_20261030_220000_guides.down,
    name: '20261030_220000_guides',
  },
  {
    up: migration_20261031_100000_faqs.up,
    down: migration_20261031_100000_faqs.down,
    name: '20261031_100000_faqs',
  },
  {
    up: migration_20261031_110000_about.up,
    down: migration_20261031_110000_about.down,
    name: '20261031_110000_about',
  },
  {
    up: migration_20261031_120000_trust_pages.up,
    down: migration_20261031_120000_trust_pages.down,
    name: '20261031_120000_trust_pages',
  },
  {
    up: migration_20261031_130000_localize_content.up,
    down: migration_20261031_130000_localize_content.down,
    name: '20261031_130000_localize_content',
  },
  {
    up: migration_20261031_140000_german_pages.up,
    down: migration_20261031_140000_german_pages.down,
    name: '20261031_140000_german_pages',
  },
];
