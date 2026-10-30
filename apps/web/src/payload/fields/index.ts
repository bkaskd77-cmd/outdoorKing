import type { Field } from "payload";

export function slugField(overrides: Partial<Field> = {}): Field {
  return {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    localized: true,
    ...overrides,
  } as Field;
}

export function seoGroup(): Field {
  return {
    name: "seo",
    type: "group",
    label: "Extra SEO fields",
    admin: {
      description:
        "Older SEO fields, filled by the AI writer. The SEO tab is what search engines use.",
    },
    fields: [
      { name: "title", type: "text" },
      { name: "description", type: "textarea" },
      { name: "canonical", type: "text" },
      { name: "ogImage", type: "upload", relationTo: "media" },
    ],
  };
}

export function sourcesField(): Field {
  return {
    name: "sources",
    type: "array",
    labels: { singular: "Source", plural: "Sources" },
    admin: {
      initCollapsed: true,
      description: "Where the facts on this page come from. Not shown on the site.",
    },
    fields: [
      { name: "url", type: "text", required: true },
      { name: "title", type: "text", required: true },
      { name: "accessedAt", type: "text" },
      { name: "note", type: "text" },
    ],
  };
}

export function factCheckGroup(): Field {
  return {
    name: "factCheck",
    type: "group",
    label: "Fact check",
    fields: [
      { name: "checkedBy", type: "relationship", relationTo: "users" },
      { name: "checkedAt", type: "date" },
      { name: "notes", type: "textarea" },
    ],
  };
}

export function geoGroup(): Field {
  return {
    name: "geo",
    type: "group",
    label: "Map position",
    fields: [
      { name: "lat", type: "number" },
      { name: "lng", type: "number" },
      { name: "geojson", type: "json" },
      { name: "demTileSet", type: "text" },
    ],
  };
}

export const createdByFields: Field[] = [
  {
    name: "createdBy",
    type: "relationship",
    relationTo: "users",
    admin: { readOnly: true, position: "sidebar" },
  },
  {
    name: "updatedBy",
    type: "relationship",
    relationTo: "users",
    admin: { readOnly: true, position: "sidebar" },
  },
];
