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
    admin: { readOnly: true },
  },
  {
    name: "updatedBy",
    type: "relationship",
    relationTo: "users",
    admin: { readOnly: true },
  },
];
