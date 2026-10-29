import base from "@ok/config/eslint";

const catalogValues = [
  "codeCatalog",
  "activities",
  "regions",
  "seasons",
  "permits",
  "peaks",
  "faqs",
  "pages",
  "getTrips",
  "getFlagshipTrips",
  "getHomeJourneys",
  "getTrip",
  "tripsByActivity",
  "tripsByRegion",
  "getRegionShowcase",
  "getPage",
  "getPermit",
  "getPeak",
  "getFaq",
];

export default [
  ...base,
  {
    // Pages and components render what editors publish in the CMS. The code catalog
    // only seeds the CMS and backs it up; read the live catalog with getCatalog().
    files: [
      "src/app/**/*.{ts,tsx}",
      "src/components/**/*.{ts,tsx}",
      "src/lib/**/*.{ts,tsx}",
    ],
    ignores: ["**/*.test.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/content/catalog",
              importNames: catalogValues,
              message: 'Read the live catalog with getCatalog() from "@/content/store".',
            },
          ],
          patterns: [
            {
              group: ["apps/*", "**/apps/**"],
              message: "Packages and apps must not import from apps/*.",
            },
          ],
        },
      ],
    },
  },
];
