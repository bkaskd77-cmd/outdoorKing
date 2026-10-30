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

/** Unnamed tabs only change the editor layout, not the stored data. */
function tabs(
  ...items: { label: string; description?: string; fields: Field[] }[]
): Field {
  return { type: "tabs", tabs: items };
}

function row(...fields: Field[]): Field {
  return { type: "row", fields };
}

function sitePreview(path: (slug: string) => string) {
  return ({ slug }: Record<string, unknown>) =>
    typeof slug === "string" && slug ? `/en${path(slug)}` : null;
}

export const Activities: CollectionConfig = {
  slug: "activities",
  versions,
  defaultSort: "order",
  labels: { singular: "Activity", plural: "Activities" },
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "slug", "summary"],
    description: "Trekking, climbing, tours… Each has its own page listing its trips.",
    preview: sitePreview((slug) => `/activities/${slug}`),
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("activity"), enqueueEmbed],
    afterDelete: [revalidateDelete("activity")],
  },
  fields: [
    tabs(
      {
        label: "Content",
        fields: [
          { name: "title", type: "text", required: true, localized: true },
          row(slugField({ label: "URL slug" } as never), {
            name: "order",
            type: "number",
            required: true,
            defaultValue: 0,
            admin: { description: "Lower numbers show first." },
          }),
          {
            name: "summary",
            type: "textarea",
            localized: true,
            admin: { description: "One or two sentences for cards and the page intro." },
          },
          { name: "body", type: "textarea", localized: true, label: "Page text" },
          { name: "heroMedia", type: "upload", relationTo: "media", label: "Hero photo" },
          { name: "icon", type: "text", admin: { description: "Icon name, optional." } },
        ],
      },
      { label: "Sources & checks", fields: metaFields },
    ),
  ],
};

export const Regions: CollectionConfig = {
  slug: "regions",
  versions,
  defaultSort: "name",
  labels: { singular: "Region", plural: "Regions" },
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug", "summary"],
    description: "Everest, Annapurna, Langtang… Each region has its own page.",
    preview: sitePreview((slug) => `/regions/${slug}`),
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("region"), enqueueEmbed],
    afterDelete: [revalidateDelete("region")],
  },
  fields: [
    tabs(
      {
        label: "Content",
        fields: [
          row(
            { name: "name", type: "text", required: true, localized: true },
            slugField({ label: "URL slug" } as never),
          ),
          {
            name: "summary",
            type: "textarea",
            admin: { description: "One or two sentences for cards and the page intro." },
          },
          { name: "body", type: "textarea", label: "Page text" },
          {
            name: "access",
            type: "textarea",
            label: "Getting there",
            admin: { description: "Flights, roads and the usual starting point." },
          },
          {
            name: "altitudeRangeM",
            type: "group",
            label: "Altitude range (metres)",
            admin: { hideGutter: true },
            fields: [
              row(
                { name: "min", type: "number", label: "Lowest" },
                { name: "max", type: "number", label: "Highest" },
              ),
            ],
          },
          {
            name: "permits",
            type: "relationship",
            relationTo: "permits",
            hasMany: true,
          },
          {
            name: "seasons",
            type: "relationship",
            relationTo: "seasons",
            hasMany: true,
            label: "Best seasons",
          },
        ],
      },
      {
        label: "Photos & map",
        fields: [
          { name: "gallery", type: "upload", relationTo: "media", hasMany: true },
          geoGroup(),
        ],
      },
      { label: "Sources & checks", fields: metaFields },
    ),
  ],
};

export const ItineraryDays: CollectionConfig = {
  slug: "itinerary-days",
  versions,
  defaultSort: "dayNumber",
  labels: { singular: "Itinerary day", plural: "Itinerary days" },
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    defaultColumns: ["dayNumber", "dayLabel", "title", "sleepAltitudeM", "dayType"],
    listSearchableFields: ["title"],
    description: "Days are easiest to edit from their trip, in its Itinerary tab.",
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
    row(
      { name: "dayNumber", type: "number", required: true, min: 1, label: "Day" },
      {
        name: "dayLabel",
        type: "text",
        label: "Day label",
        admin: {
          description:
            'Optional. Shown instead of the day number, for example "9–12" for a rotation block.',
        },
      },
      {
        name: "dayType",
        type: "select",
        required: true,
        defaultValue: "trek",
        label: "Type of day",
        options: [
          { label: "Trekking", value: "trek" },
          { label: "Rest / acclimatisation", value: "rest-acclimatization" },
          { label: "Summit", value: "summit" },
          { label: "Travel", value: "travel" },
          { label: "Flight", value: "flight" },
          { label: "Spare day (weather/flights)", value: "contingency" },
          { label: "City", value: "city" },
        ],
      },
    ),
    { name: "title", type: "text", required: true, localized: true },
    { name: "description", type: "textarea", localized: true },
    row(
      { name: "fromPlace", type: "text", label: "From" },
      { name: "toPlace", type: "text", label: "To" },
    ),
    row(
      {
        name: "startAltitudeM",
        type: "number",
        required: true,
        label: "Start altitude (m)",
      },
      { name: "highPointM", type: "number", required: true, label: "Highest point (m)" },
      {
        name: "sleepAltitudeM",
        type: "number",
        required: true,
        label: "Sleeping altitude (m)",
      },
    ),
    row(
      { name: "walkingHours", type: "text", label: "Walking hours" },
      { name: "distanceKm", type: "number", label: "Distance (km)" },
      { name: "ascentM", type: "number", label: "Ascent (m)" },
      { name: "descentM", type: "number", label: "Descent (m)" },
    ),
    row(
      {
        name: "accommodation",
        type: "select",
        options: [
          { label: "Teahouse", value: "teahouse" },
          { label: "Lodge", value: "lodge" },
          { label: "Tent", value: "tent" },
          { label: "Hotel", value: "hotel" },
        ],
      },
      {
        name: "peak",
        type: "relationship",
        relationTo: "peaks",
        label: "Summit (if any)",
      },
    ),
    sourcesField(),
  ],
};

export const Peaks: CollectionConfig = {
  slug: "peaks",
  versions,
  defaultSort: "name",
  labels: { singular: "Peak", plural: "Peaks" },
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug"],
    description: "Mountains that trips climb. Each has its own page.",
    preview: sitePreview((slug) => `/peaks/${slug}`),
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("peak"), enqueueEmbed],
    afterDelete: [revalidateDelete("peak")],
  },
  fields: [
    row(
      { name: "name", type: "text", required: true },
      slugField({ localized: false, label: "URL slug" } as never),
    ),
    row(
      { name: "heightM", type: "number", required: true, label: "Height (m)" },
      { name: "region", type: "relationship", relationTo: "regions" },
    ),
    row(
      {
        name: "classification",
        type: "select",
        options: [
          { label: "NMA trekking peak, group A", value: "nma-trekking-peak-group-a" },
          { label: "NMA trekking peak, group B", value: "nma-trekking-peak-group-b" },
          { label: "Expedition peak", value: "expedition-peak" },
          { label: "None", value: "none" },
        ],
      },
      {
        name: "permitAuthority",
        type: "select",
        label: "Permit issued by",
        options: ["NMA", "DoT (Department of Tourism)"],
      },
    ),
    geoGroup(),
    sourcesField(),
    factCheckGroup(),
  ],
};

export const Permits: CollectionConfig = {
  slug: "permits",
  versions,
  defaultSort: "name",
  labels: { singular: "Permit", plural: "Permits" },
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug"],
    description: "Park fees, conservation and restricted-area permits trips need.",
    preview: sitePreview((slug) => `/permits/${slug}`),
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
    row(
      { name: "name", type: "text", required: true },
      slugField({ localized: false, label: "URL slug" } as never),
    ),
    row(
      { name: "authority", type: "text", label: "Issued by" },
      {
        name: "lastVerifiedAt",
        type: "date",
        required: true,
        label: "Last checked",
        admin: { description: "When someone last confirmed the fee and rules." },
      },
    ),
    row(
      {
        name: "requiresLicensedGuide",
        type: "checkbox",
        label: "Needs a licensed guide",
      },
      { name: "minGroupSize", type: "number", label: "Minimum group size" },
    ),
    { name: "processingNotes", type: "textarea", label: "Notes for travellers" },
    sourcesField(),
  ],
};

export const Seasons: CollectionConfig = {
  slug: "seasons",
  versions,
  defaultSort: "name",
  labels: { singular: "Season", plural: "Seasons" },
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug"],
    description: "Trekking seasons that trips and regions link to.",
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("season")],
    afterDelete: [revalidateDelete("season")],
  },
  fields: [
    row(
      { name: "name", type: "text", required: true },
      slugField({ localized: false, label: "URL slug" } as never),
    ),
    {
      name: "months",
      type: "select",
      hasMany: true,
      options: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].map((label, i) => ({ label, value: String(i + 1) })),
    },
    { name: "weatherSummary", type: "textarea", label: "Weather" },
  ],
};

export const Trips: CollectionConfig = {
  slug: "trips",
  versions,
  defaultSort: "title",
  labels: { singular: "Trip", plural: "Trips" },
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "slug", "subtitle"],
    description: "Every trip on the site, with its itinerary day by day.",
    preview: sitePreview((slug) => `/trips/${slug}`),
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
    tabs(
      {
        label: "Overview",
        fields: [
          { name: "title", type: "text", required: true, localized: true },
          {
            name: "subtitle",
            type: "text",
            localized: true,
            admin: {
              description: "One line under the title on cards and the trip page.",
            },
          },
          row(
            {
              name: "activity",
              type: "relationship",
              relationTo: "activities",
              required: true,
            },
            {
              name: "difficulty",
              type: "select",
              required: true,
              options: [
                { label: "Easy", value: "easy" },
                { label: "Moderate", value: "moderate" },
                { label: "Challenging", value: "challenging" },
                { label: "Strenuous", value: "strenuous" },
                { label: "Technical", value: "technical" },
              ],
            },
          ),
          row(
            {
              name: "regions",
              type: "relationship",
              relationTo: "regions",
              hasMany: true,
            },
            {
              name: "groupType",
              type: "select",
              hasMany: true,
              label: "Group types",
              options: [
                { label: "Private", value: "private" },
                { label: "Family", value: "family" },
                { label: "Small private group", value: "small-group-private" },
              ],
            },
          ),
          {
            name: "technicalGrade",
            type: "text",
            admin: { description: "Climbs only, for example “PD+ / 45° ice”." },
          },
          {
            name: "overview",
            type: "textarea",
            localized: true,
            admin: { description: "The main introduction on the trip page." },
          },
          {
            name: "highlights",
            type: "array",
            labels: { singular: "Highlight", plural: "Highlights" },
            admin: { initCollapsed: true },
            fields: [{ name: "text", type: "text", required: true }],
          },
          slugField({
            label: "URL slug",
            admin: {
              description: "The end of the trip's web address. Change it with care.",
            },
          } as never),
        ],
      },
      {
        label: "Itinerary",
        description:
          "The days below are checked against the altitude safety rules before the trip can publish.",
        fields: [
          {
            name: "durationDays",
            type: "group",
            label: "Length (days)",
            admin: { hideGutter: true },
            fields: [
              row(
                { name: "min", type: "number", required: true, label: "Shortest" },
                { name: "typical", type: "number", required: true, label: "Usual" },
                { name: "max", type: "number", required: true, label: "Longest" },
              ),
            ],
          },
          row(
            {
              name: "maxAltitudeM",
              type: "number",
              required: true,
              label: "Max altitude (m)",
              admin: { description: "Must match the highest point in the days below." },
            },
            { name: "maxAltitudePoint", type: "text", label: "Where that is" },
          ),
          row(
            { name: "startPoint", type: "text", label: "Starts in" },
            { name: "endPoint", type: "text", label: "Ends in" },
          ),
          {
            name: "usesLukla",
            type: "checkbox",
            defaultValue: false,
            label: "Flies to Lukla",
            admin: {
              description:
                "Flies to Lukla or via Ramechhap/Manthali. Needs at least one spare day for flight delays.",
            },
          },
          {
            name: "itinerary",
            type: "join",
            collection: "itinerary-days",
            on: "trip",
            label: "Days",
            defaultSort: "dayNumber",
            defaultLimit: 100,
            admin: {
              allowCreate: true,
              defaultColumns: ["dayNumber", "title", "sleepAltitudeM", "dayType"],
            },
          },
          {
            name: "acclimatizationNotes",
            type: "textarea",
            label: "Acclimatisation notes",
          },
          {
            name: "contingency",
            type: "textarea",
            label: "Spare days & delays",
            admin: { description: "How weather or flight delays are handled." },
          },
        ],
      },
      {
        label: "What's included",
        fields: [
          {
            name: "inclusions",
            type: "array",
            label: "Included",
            labels: { singular: "Item", plural: "Included" },
            admin: { initCollapsed: true },
            fields: [{ name: "text", type: "text" }],
          },
          {
            name: "exclusions",
            type: "array",
            label: "Not included",
            labels: { singular: "Item", plural: "Not included" },
            admin: { initCollapsed: true },
            fields: [{ name: "text", type: "text" }],
          },
        ],
      },
      {
        label: "Links",
        description: "What this trip connects to. These show as links on the trip page.",
        fields: [
          { name: "peaks", type: "relationship", relationTo: "peaks", hasMany: true },
          { name: "permits", type: "relationship", relationTo: "permits", hasMany: true },
          {
            name: "seasons",
            type: "relationship",
            relationTo: "seasons",
            hasMany: true,
            label: "Best seasons",
          },
          {
            name: "faqs",
            type: "relationship",
            relationTo: "faqs",
            hasMany: true,
            label: "FAQs",
          },
          {
            name: "relatedTrips",
            type: "relationship",
            relationTo: "trips",
            hasMany: true,
            label: "Similar trips",
          },
        ],
      },
      {
        label: "Photos",
        fields: [
          {
            name: "media",
            type: "upload",
            relationTo: "media",
            hasMany: true,
            label: "Photos",
            admin: { description: "The first photo is the main one." },
          },
        ],
      },
      { label: "Sources & checks", fields: metaFields },
      {
        label: "Advanced",
        description: "Technical settings. Most trips never need these changed.",
        fields: [
          {
            name: "depositPolicy",
            type: "group",
            label: "Deposit",
            access: { read: financeField },
            fields: [
              row(
                {
                  name: "depositPct",
                  type: "number",
                  defaultValue: 30,
                  min: 10,
                  max: 100,
                  label: "Deposit (%)",
                },
                {
                  name: "balanceDueDaysBefore",
                  type: "number",
                  defaultValue: 45,
                  min: 7,
                  max: 120,
                  label: "Balance due (days before)",
                },
              ),
            ],
          },
          {
            name: "internalNotes",
            type: "textarea",
            access: { read: staffOnlyField },
            admin: { description: "Staff only. Never shown on the site." },
          },
          {
            name: "routeGeo",
            type: "group",
            label: "Route map data",
            fields: [
              { name: "geojson", type: "json" },
              {
                name: "waypoints",
                type: "array",
                admin: { initCollapsed: true },
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
          { name: "designerDefaults", type: "json" },
          {
            name: "ruleReport",
            type: "json",
            label: "Last safety report",
            admin: { readOnly: true },
          },
        ],
      },
    ),
    // Kept after the tabs: the SEO plugin appends its tab to a leading tabs field.
    {
      name: "safetyCheck",
      type: "ui",
      admin: {
        position: "sidebar",
        components: { Field: "/components/admin/TripSafetyCheck#TripSafetyCheck" },
      },
    },
  ],
};

export const Posts: CollectionConfig = {
  slug: "posts",
  versions,
  defaultSort: "title",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "slug", "excerpt"],
    description: "Articles and travel guides.",
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
    tabs(
      {
        label: "Content",
        fields: [
          { name: "title", type: "text", required: true, localized: true },
          {
            name: "excerpt",
            type: "textarea",
            admin: { description: "Two sentences for cards and search results." },
          },
          { name: "body", type: "textarea", localized: true, label: "Article" },
          { name: "heroMedia", type: "upload", relationTo: "media", label: "Hero photo" },
          row(
            { name: "author", type: "relationship", relationTo: "team-members" },
            { name: "publishedAt", type: "date", label: "Publish date" },
          ),
          slugField({ label: "URL slug" } as never),
        ],
      },
      {
        label: "Topics",
        fields: [
          { name: "categories", type: "text" },
          { name: "regions", type: "relationship", relationTo: "regions", hasMany: true },
          {
            name: "activities",
            type: "relationship",
            relationTo: "activities",
            hasMany: true,
          },
          { name: "aiAssisted", type: "checkbox", label: "Written with AI help" },
        ],
      },
      { label: "Sources & checks", fields: metaFields },
    ),
  ],
};

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  versions,
  defaultSort: "name",
  labels: { singular: "Team member", plural: "Team" },
  admin: staffCollectionAdmin({
    useAsTitle: "name",
    listSearchableFields: ["name", "slug", "roleTitle"],
    description: "People shown on the Team page. Only real staff, entered by a person.",
  }),
  access: contentAccess({ create: denyAiAgent, update: denyAiAgent }),
  hooks: {
    afterChange: [revalidateCollection("team-member")],
    afterDelete: [revalidateDelete("team-member")],
  },
  fields: [
    row(
      { name: "name", type: "text", required: true },
      { name: "roleTitle", type: "text", label: "Job title" },
    ),
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "bio", type: "textarea" },
    row(
      { name: "languages", type: "text" },
      { name: "yearsExperience", type: "number", label: "Years of experience" },
      {
        name: "order",
        type: "number",
        admin: { description: "Lower numbers show first." },
      },
    ),
    row(
      { name: "isGuide", type: "checkbox", label: "Works as a guide" },
      { name: "publicProfile", type: "checkbox", label: "Show on the Team page" },
    ),
    slugField({ localized: false, label: "URL slug" } as never),
  ],
};

export const Guides: CollectionConfig = {
  slug: "guides",
  versions,
  labels: { singular: "Guide licence", plural: "Guide licences" },
  admin: staffCollectionAdmin({
    useAsTitle: "id",
    listSearchableFields: ["guideLicenseNumber", "specialties"],
    description:
      "Licence details for team members who guide. Licence numbers stay private.",
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
  labels: { singular: "Review", plural: "Reviews" },
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "authorDisplayName"],
    description: "Real traveller reviews, with their permission to publish.",
  }),
  access: contentAccess({ create: reviewCreate }),
  fields: [
    row(
      {
        name: "source",
        type: "select",
        required: true,
        label: "Where it was posted",
        options: [
          { label: "Sent to us directly", value: "direct" },
          { label: "Tripadvisor", value: "tripadvisor" },
          { label: "Google", value: "google" },
          { label: "Trustpilot", value: "trustpilot" },
        ],
      },
      {
        name: "rating",
        type: "number",
        min: 1,
        max: 5,
        required: true,
        label: "Stars (1–5)",
      },
    ),
    { name: "sourceUrl", type: "text", label: "Link to the original review" },
    { name: "title", type: "text" },
    { name: "body", type: "textarea", label: "Review" },
    row(
      { name: "authorDisplayName", type: "text", label: "Name shown" },
      { name: "country", type: "text" },
      { name: "trip", type: "relationship", relationTo: "trips" },
    ),
    row(
      {
        name: "verified",
        type: "checkbox",
        label: "Verified traveller",
        access: { update: staffOnlyField },
      },
      { name: "consentToPublish", type: "checkbox", label: "Agreed to be published" },
    ),
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  versions,
  defaultSort: "title",
  labels: { singular: "Page", plural: "Pages" },
  admin: staffCollectionAdmin({
    useAsTitle: "title",
    listSearchableFields: ["title", "slug", "path"],
    description: "About, Contact, Privacy and the site's other text pages.",
    preview: ({ path }: Record<string, unknown>) =>
      typeof path === "string" && path ? `/en${path}` : null,
  }),
  access: contentAccess(),
  hooks: {
    afterChange: [revalidateCollection("page"), enqueueEmbed],
    afterDelete: [revalidateDelete("page")],
  },
  fields: [
    tabs(
      {
        label: "Content",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "body", type: "textarea", label: "Page text" },
          row(slugField({ localized: false, label: "Slug" } as never), {
            name: "path",
            type: "text",
            label: "Web address",
            admin: { description: "For example /about." },
          }),
        ],
      },
      { label: "Sources & checks", fields: metaFields },
    ),
  ],
};

export const Faqs: CollectionConfig = {
  slug: "faqs",
  versions,
  defaultSort: "question",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: staffCollectionAdmin({
    useAsTitle: "question",
    listSearchableFields: ["question", "slug", "answer"],
    description: "Questions on the FAQ page. Trips can link to them too.",
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
    { name: "answer", type: "textarea", required: true },
    row(
      {
        name: "category",
        type: "select",
        options: [
          { label: "Permits", value: "permits" },
          { label: "Insurance", value: "insurance" },
          { label: "Safety", value: "safety" },
          { label: "Altitude", value: "altitude" },
          { label: "Payments", value: "payments" },
          { label: "Booking", value: "booking" },
          { label: "Packing", value: "packing" },
        ],
      },
      {
        name: "order",
        type: "number",
        admin: { description: "Lower numbers show first." },
      },
      slugField({ localized: false, label: "Slug" } as never),
    ),
    sourcesField(),
  ],
};

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Photo", plural: "Media library" },
  admin: staffCollectionAdmin({
    useAsTitle: "alt",
    listSearchableFields: ["alt", "credit"],
    description: "Every photo on the site. Upload once, then pick it anywhere.",
  }),
  access: { read: () => true, create: staffWrite, update: staffWrite },
  upload: { mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"] },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Description",
      admin: { description: "What the photo shows, for screen readers and search." },
    },
    row(
      { name: "credit", type: "text", label: "Photographer" },
      { name: "license", type: "text", label: "Licence" },
    ),
  ],
};
