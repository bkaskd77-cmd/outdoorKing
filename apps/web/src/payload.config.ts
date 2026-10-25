import { brand } from "@ok/config";
import { env } from "@ok/env/server";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";

import {
  Activities,
  Faqs,
  Guides,
  ItineraryDays,
  Media,
  Pages,
  Peaks,
  Permits,
  Posts,
  Regions,
  Reviews,
  Seasons,
  TeamMembers,
  Trips,
  Users,
} from "./payload/collections";
import { migrations } from "./migrations";
import {
  CompanyFacts,
  Footer,
  Navigation,
  PaymentPolicy,
  SafetyRules,
  SiteSettings,
} from "./payload/globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ["/components/admin/AiWriter#AiWriterPanel"],
      beforeNavLinks: ["/components/admin/QuotesNav#QuotesNavLink"],
      views: {
        login: {
          Component: "/components/admin/Login#LoginView",
        },
        quotes: {
          Component: "/components/admin/QuotesView#QuotesView",
          path: "/quotes",
          exact: false,
          meta: {
            title: "Quotes",
          },
        },
      },
    },
    meta: {
      titleSuffix: `· ${brand.name}`,
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Faqs,
    Activities,
    Regions,
    Trips,
    ItineraryDays,
    Peaks,
    Permits,
    Seasons,
    Posts,
    TeamMembers,
    Guides,
    Reviews,
  ],
  globals: [SiteSettings, CompanyFacts, Navigation, Footer, SafetyRules, PaymentPolicy],
  editor: lexicalEditor(),
  serverURL: env.BETTER_AUTH_URL,
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: env.DATABASE_URL },
    schemaName: "payload",
    push: env.NODE_ENV !== "production",
    migrationDir: path.resolve(dirname, "migrations"),
    prodMigrations: migrations,
  }),
  localization: {
    locales: [
      { code: "en", label: "English" },
      { code: "de", label: "Deutsch" },
      { code: "fr", label: "Français" },
      { code: "zh-Hans", label: "简体中文" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  email: resendAdapter({
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: env.EMAIL_FROM.includes("<")
      ? (env.EMAIL_FROM.split("<")[1]?.replace(">", "") ?? "hello@localhost")
      : env.EMAIL_FROM,
    defaultFromName: brand.name,
  }),
  plugins: [
    seoPlugin({
      collections: ["pages", "faqs", "trips", "regions", "posts", "activities", "peaks"],
      uploadsCollection: "media",
    }),
    redirectsPlugin({ collections: ["pages", "trips"] }),
    s3Storage({
      collections: { media: true },
      bucket: env.R2_BUCKET_MEDIA,
      clientUploads: true,
      config: {
        endpoint: env.R2_ENDPOINT,
        region: "auto",
        forcePathStyle: true,
        credentials: {
          accessKeyId: env.R2_ACCESS_KEY_ID,
          secretAccessKey: env.R2_SECRET_ACCESS_KEY,
        },
      },
    }),
  ],
  sharp,
  graphQL: {
    disable: env.VERCEL_ENV === "production",
  },
});
