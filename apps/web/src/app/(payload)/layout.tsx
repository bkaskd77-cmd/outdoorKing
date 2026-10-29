/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from "@payload-config";
import "@payloadcms/next/css";
import type { Metadata } from "next";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";

import { AdminBrowserGuard } from "../../components/admin/AdminBrowserGuard";
import { fraunces, inter } from "../../fonts";
import { importMap } from "./admin/importMap.js";
import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

/** Staff admin must never advertise as an installable app window. */
export const metadata: Metadata = {
  // Explicitly omit `manifest` — admin is not a PWA surface.
  appleWebApp: { capable: false },
  other: {
    "mobile-web-app-capable": "no",
    "apple-mobile-web-app-capable": "no",
  },
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    htmlProps={{ className: `${fraunces.variable} ${inter.variable} ok-staff` }}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    <AdminBrowserGuard />
    {children}
  </RootLayout>
);

export default Layout;
