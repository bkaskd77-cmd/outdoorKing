import type { CollectionConfig, Field } from "payload";

import {
  denyAiAgent,
  financeField,
  hasPermission,
  reviewCreate,
  staffDelete,
  staffDraftOrPublished,
  staffOnlyField,
  staffWrite,
} from "../access";
import {
  createdByFields,
  factCheckGroup,
  geoGroup,
  seoGroup,
  slugField,
  sourcesField,
} from "../fields";
import { enqueueEmbed } from "../hooks/chunks";
import { revalidateCollection, revalidateDelete } from "../hooks/revalidate";
import { blockUnsafePublish } from "../hooks/rules";
import { staffCollectionAdmin } from "../staff-admin";

const versions = { drafts: { autosave: true } } as const;

function contentAccess(
  extra?: Partial<CollectionConfig["access"]>,
): CollectionConfig["access"] {
  return {
    read: staffDraftOrPublished,
    create: staffWrite,
    update: staffWrite,
    delete: staffDelete,
    ...extra,
  };
}

const metaFields: Field[] = [
  seoGroup(),
  sourcesField(),
  factCheckGroup(),
  ...createdByFields,
];

export const Activities: CollectionConfig = {
  slug: "activities",
  versions,
  defaultSort: "order",
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "slug", "summary"],
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("activity"), enqueueEmbed],
    afterDelete: [revalidateDelete("activity")],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    slugField(),
    { name: "summary", type: "textarea", localized: true },
    { name: "body", type: "textarea", localized: true },
    { name: "heroMedia", type: "upload", relationTo: "media" },
    { name: "icon", type: "text" },
    { name: "order", type: "number", required: true, defaultValue: 0 },
    ...metaFields,
  ],
};

export const Regions: CollectionConfig = {
  slug: "regions",
  versions,
  defaultSort: "name",
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug", "summary"],
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("region"), enqueueEmbed],
    afterDelete: [revalidateDelete("region")],
  },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    slugField(),
    { name: "summary", type: "textarea" },
    { name: "body", type: "textarea" },
    geoGroup(),
    {
      name: "altitudeRangeM",
      type: "group",
      fields: [
        { name: "min", type: "number" },
        { name: "max", type: "number" },
      ],
    },
    { name: "access", type: "textarea" },
    { name: "permits", type: "relationship", relationTo: "permits", hasMany: true },
    { name: "seasons", type: "relationship", relationTo: "seasons", hasMany: true },
    { name: "gallery", type: "upload", relationTo: "media", hasMany: true },
    ...metaFields,
  ],
};

export const ItineraryDays: CollectionConfig = {
  slug: "itinerary-days",
  versions,
  defaultSort: "dayNumber",
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    defaultColumns: ["dayNumber", "title"],
    listSearchableFields: ["title"],
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("itinerary-day")],
    afterDelete: [revalidateDelete("itinerary-day")],
  },
  fields: [
    {
      name: "trip",
      type: "relationship",
      relationTo: "trips",
      required: true,
      index: true,
    },
    { name: "dayNumber", type: "number", required: true, min: 1 },
    {
      name: "dayLabel",
      type: "text",
      admin: {
        description:
          'Optional. Shown instead of the day number, for example "9–12" for a rotation block.',
      },
    },
    { name: "title", type: "text", required: true, localized: true },
    { name: "description", type: "textarea", localized: true },
    { name: "fromPlace", type: "text" },
    { name: "toPlace", type: "text" },
    { name: "startAltitudeM", type: "number", required: true },
    { name: "highPointM", type: "number", required: true },
    { name: "sleepAltitudeM", type: "number", required: true },
    { name: "distanceKm", type: "number" },
    { name: "ascentM", type: "number" },
    { name: "descentM", type: "number" },
    { name: "walkingHours", type: "text" },
    {
      name: "dayType",
      type: "select",
      required: true,
      defaultValue: "trek",
      options: [
        "trek",
        "rest-acclimatization",
        "summit",
        "travel",
        "flight",
        "contingency",
        "city",
      ],
    },
    {
      name: "accommodation",
      type: "select",
      options: ["teahouse", "lodge", "tent", "hotel"],
    },
    { name: "peak", type: "relationship", relationTo: "peaks" },
    sourcesField(),
  ],
};

export const Peaks: CollectionConfig = {
  slug: "peaks",
  versions,
  defaultSort: "name",
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug"],
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("peak"), enqueueEmbed],
    afterDelete: [revalidateDelete("peak")],
  },
  fields: [
    { name: "name", type: "text", required: true },
    slugField({ localized: false } as never),
    { name: "heightM", type: "number", required: true },
    { name: "region", type: "relationship", relationTo: "regions" },
    {
      name: "classification",
      type: "select",
      options: [
        "nma-trekking-peak-group-a",
        "nma-trekking-peak-group-b",
        "expedition-peak",
        "none",
      ],
    },
    {
      name: "permitAuthority",
      type: "select",
      options: ["NMA", "DoT (Department of Tourism)"],
    },
    geoGroup(),
    sourcesField(),
    factCheckGroup(),
  ],
};

export const Permits: CollectionConfig = {
  slug: "permits",
  versions,
  defaultSort: "name",
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug"],
  }),
  access: contentAccess(),
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.lastVerifiedAt) {
          throw new Error("permits.lastVerifiedAt is required.");
        }
        return data;
      },
    ],
    afterChange: [revalidateCollection("permit"), enqueueEmbed],
    afterDelete: [revalidateDelete("permit")],
  },
  fields: [
    { name: "name", type: "text", required: true },
    slugField({ localized: false } as never),
    { name: "authority", type: "text" },
    { name: "lastVerifiedAt", type: "date", required: true },
    { name: "requiresLicensedGuide", type: "checkbox" },
    { name: "minGroupSize", type: "number" },
    { name: "processingNotes", type: "textarea" },
    sourcesField(),
  ],
};

export const Seasons: CollectionConfig = {
  slug: "seasons",
  versions,
  defaultSort: "name",
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug"],
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("season")],
    afterDelete: [revalidateDelete("season")],
  },
  fields: [
    { name: "name", type: "text", required: true },
    slugField({ localized: false } as never),
    {
      name: "months",
      type: "select",
      hasMany: true,
      options: Array.from({ length: 12 }, (_, i) => ({
        label: String(i + 1),
        value: String(i + 1),
      })),
    },
    { name: "weatherSummary", type: "textarea" },
  ],
};

export const Trips: CollectionConfig = {
  slug: "trips",
  versions,
  defaultSort: "title",
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "slug", "subtitle"],
  }),
  access: contentAccess(),
  hooks: {
    beforeChange: [blockUnsafePublish],
    afterChange: [revalidateCollection("trip"), enqueueEmbed],
    afterDelete: [revalidateDelete("trip")],
    afterRead: [
      ({ doc, req }) => {
        if (!hasPermission(req.user, "content:read_draft")) {
          delete doc.internalNotes;
          delete doc.depositPolicy;
        }
        return doc;
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    slugField(),
    { name: "subtitle", type: "text", localized: true },
    { name: "activity", type: "relationship", relationTo: "activities", required: true },
    { name: "regions", type: "relationship", relationTo: "regions", hasMany: true },
    {
      name: "difficulty",
      type: "select",
      required: true,
      options: ["easy", "moderate", "challenging", "strenuous", "technical"],
    },
    { name: "technicalGrade", type: "text" },
    {
      name: "durationDays",
      type: "group",
      fields: [
        { name: "min", type: "number", required: true },
        { name: "typical", type: "number", required: true },
        { name: "max", type: "number", required: true },
      ],
    },
    { name: "maxAltitudeM", type: "number", required: true },
    { name: "maxAltitudePoint", type: "text" },
    { name: "startPoint", type: "text" },
    { name: "endPoint", type: "text" },
    {
      name: "usesLukla",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Flies to Lukla or via Ramechhap/Manthali. Turns on the flight-delay buffer rules.",
      },
    },
    {
      name: "groupType",
      type: "select",
      hasMany: true,
      options: ["private", "family", "small-group-private"],
    },
    {
      name: "highlights",
      type: "array",
      fields: [{ name: "text", type: "text", required: true }],
    },
    { name: "overview", type: "textarea", localized: true },
    { name: "peaks", type: "relationship", relationTo: "peaks", hasMany: true },
    { name: "permits", type: "relationship", relationTo: "permits", hasMany: true },
    { name: "seasons", type: "relationship", relationTo: "seasons", hasMany: true },
    { name: "acclimatizationNotes", type: "textarea" },
    { name: "inclusions", type: "array", fields: [{ name: "text", type: "text" }] },
    { name: "exclusions", type: "array", fields: [{ name: "text", type: "text" }] },
    { name: "contingency", type: "textarea" },
    {
      name: "routeGeo",
      type: "group",
      fields: [
        { name: "geojson", type: "json" },
        {
          name: "waypoints",
          type: "array",
          fields: [
            { name: "name", type: "text" },
            { name: "lat", type: "number" },
            { name: "lng", type: "number" },
            { name: "altitudeM", type: "number" },
            { name: "dayNumber", type: "number" },
          ],
        },
      ],
    },
    { name: "mapStyle", type: "json" },
    { name: "media", type: "upload", relationTo: "media", hasMany: true },
    { name: "faqs", type: "relationship", relationTo: "faqs", hasMany: true },
    { name: "relatedTrips", type: "relationship", relationTo: "trips", hasMany: true },
    { name: "designerDefaults", type: "json" },
    {
      name: "depositPolicy",
      type: "group",
      access: { read: financeField },
      fields: [
        { name: "depositPct", type: "number", defaultValue: 30, min: 10, max: 100 },
        {
          name: "balanceDueDaysBefore",
          type: "number",
          defaultValue: 45,
          min: 7,
          max: 120,
        },
      ],
    },
    { name: "ruleReport", type: "json", admin: { readOnly: true } },
    {
      name: "internalNotes",
      type: "textarea",
      access: { read: staffOnlyField },
    },
    ...metaFields,
  ],
};

export const Posts: CollectionConfig = {
  slug: "posts",
  versions,
  defaultSort: "title",
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "slug", "excerpt"],
  }),
  access: contentAccess(),
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (data._status === "published") {
          if (!hasPermission(req.user, "content:publish")) {
            throw new Error("Publishing is not allowed for this role.");
          }
        }
        return data;
      },
    ],
    afterChange: [revalidateCollection("post"), enqueueEmbed],
    afterDelete: [revalidateDelete("post")],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    slugField(),
    { name: "excerpt", type: "textarea" },
    { name: "body", type: "textarea", localized: true },
    { name: "author", type: "relationship", relationTo: "team-members" },
    { name: "categories", type: "text" },
    { name: "regions", type: "relationship", relationTo: "regions", hasMany: true },
    { name: "activities", type: "relationship", relationTo: "activities", hasMany: true },
    { name: "publishedAt", type: "date" },
    { name: "heroMedia", type: "upload", relationTo: "media" },
    { name: "aiAssisted", type: "checkbox" },
    ...metaFields,
  ],
};

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  versions,
  defaultSort: "name",
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug", "roleTitle"],
  }),
  access: contentAccess({ create: denyAiAgent, update: denyAiAgent }),
  fields: [
    { name: "name", type: "text", required: true },
    slugField({ localized: false } as never),
    { name: "roleTitle", type: "text" },
    { name: "bio", type: "textarea" },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "languages", type: "text" },
    { name: "yearsExperience", type: "number" },
    { name: "isGuide", type: "checkbox" },
    { name: "publicProfile", type: "checkbox" },
    { name: "order", type: "number" },
  ],
};

export const Guides: CollectionConfig = {
  slug: "guides",
  versions,
  admin: staffCollectionAdmin({
    useAsTitle: "id",
    listSearchableFields: ["guideLicenseNumber", "specialties"],
  }),
  access: contentAccess({ create: denyAiAgent }),
  fields: [
    {
      name: "teamMember",
      type: "relationship",
      relationTo: "team-members",
      required: true,
      unique: true,
    },
    {
      name: "guideLicenseNumber",
      type: "text",
      access: { read: staffOnlyField },
    },
    {
      name: "licenseType",
      type: "select",
      options: ["trekking", "mountaineering", "IFMGA"],
    },
    { name: "specialties", type: "text" },
    { name: "regions", type: "relationship", relationTo: "regions", hasMany: true },
  ],
};

export const Reviews: CollectionConfig = {
  slug: "reviews",
  versions,
  defaultSort: "title",
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "authorDisplayName"],
  }),
  access: contentAccess({ create: reviewCreate }),
  fields: [
    {
      name: "source",
      type: "select",
      required: true,
      options: ["direct", "tripadvisor", "google", "trustpilot"],
    },
    { name: "sourceUrl", type: "text" },
    { name: "rating", type: "number", min: 1, max: 5, required: true },
    { name: "title", type: "text" },
    { name: "body", type: "textarea" },
    { name: "authorDisplayName", type: "text" },
    { name: "country", type: "text" },
    { name: "trip", type: "relationship", relationTo: "trips" },
    { name: "verified", type: "checkbox", access: { update: staffOnlyField } },
    { name: "consentToPublish", type: "checkbox" },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  versions,
  defaultSort: "title",
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "slug", "path"],
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("page"), enqueueEmbed],
    afterDelete: [revalidateDelete("page")],
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField({ localized: false } as never),
    { name: "path", type: "text" },
    { name: "body", type: "textarea" },
    ...metaFields,
  ],
};

export const Faqs: CollectionConfig = {
  slug: "faqs",
  versions,
  defaultSort: "question",
  admin: staffCollectionAdmin({
    useAsTitle: "question",
    listSearchableFields: ["question", "slug", "answer"],
  }),
  access: contentAccess(),
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (data._status === "published" && !hasPermission(req.user, "content:publish")) {
          throw new Error("Publishing is not allowed for this role.");
        }
        return data;
      },
    ],
    afterChange: [revalidateCollection("faq"), enqueueEmbed],
    afterDelete: [revalidateDelete("faq")],
  },
  fields: [
    { name: "question", type: "text", required: true },
    slugField({ localized: false } as never),
    { name: "answer", type: "textarea", required: true },
    {
      name: "category",
      type: "select",
      options: [
        "permits",
        "insurance",
        "safety",
        "altitude",
        "payments",
        "booking",
        "packing",
      ],
    },
    { name: "order", type: "number" },
    sourcesField(),
  ],
};

export const Media: CollectionConfig = {
  slug: "media",
  admin: staffCollectionAdmin({
    useAsTitle: "alt",
    listSearchableFields: ["alt", "credit"],
  }),
  access: { read: () => true, create: staffWrite, update: staffWrite },
  upload: { mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"] },
  fields: [
    { name: "alt", type: "text", required: true },
    { name: "credit", type: "text" },
    { name: "license", type: "text" },
  ],
};
