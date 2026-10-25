import { brandName } from "@ok/config";
import { SkipLink } from "@ok/ui";
import { SmoothScroll } from "@ok/ui/motion";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { SiteChrome } from "@/components/marketing/SiteChrome";
import { PwaRegister } from "@/components/pwa/PwaRegister";
import { RefCapture } from "@/components/pwa/RefCapture";
import { HostedInsights } from "@/components/telemetry/HostedInsights";
import { canonical, hreflangMap } from "@/lib/site";
import { fraunces, inter, jetbrains, notoDevanagari, notoSansSc } from "../../../fonts";
import { routing } from "../../../i18n/routing";
import "@ok/ui/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(canonical("/")),
  title: {
    default: brandName,
    template: `%s · ${brandName}`,
  },
  description: "Private Himalayan journeys, designed around your dates.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: false,
    title: brandName,
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  alternates: {
    canonical: canonical("/"),
    languages: hreflangMap("/"),
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-lenis="off"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${notoDevanagari.variable} ${notoSansSc.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <SkipLink />
            <RefCapture />
            <SiteChrome>{children}</SiteChrome>
            <PwaRegister />
          </SmoothScroll>
        </NextIntlClientProvider>
        <HostedInsights />
      </body>
    </html>
  );
}
