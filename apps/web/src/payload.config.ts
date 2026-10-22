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

import { Faqs } from "./payload/collections/Faqs";
import { Media } from "./payload/collections/Media";
import { Pages } from "./payload/collections/Pages";
import { Users } from "./payload/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        login: {
          Component: "/components/admin/Login#LoginView",
        },
      },
    },
    meta: {
      titleSuffix: `· ${brand.name}`,
    },
  },
  collections: [Users, Media, Pages, Faqs],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: env.DATABASE_URL },
    schemaName: "payload",
    push: env.NODE_ENV === "development" && !env.CI,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  localization: {
    locales: ["en"],
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
      collections: ["pages", "faqs"],
      uploadsCollection: "media",
    }),
    redirectsPlugin({ collections: ["pages"] }),
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
