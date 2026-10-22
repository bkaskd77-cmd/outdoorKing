import { brandName } from "@ok/config";
import { SkipLink } from "@ok/ui";
import { SmoothScroll } from "@ok/ui/motion";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { SiteChrome } from "@/components/marketing/SiteChrome";
import { canonical } from "@/lib/site";
import { fraunces, inter, jetbrains, notoDevanagari } from "../../../fonts";
import { routing } from "../../../i18n/routing";
import "@ok/ui/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(canonical("/")),
  title: {
    default: brandName,
    template: `%s · ${brandName}`,
  },
  description: "Private Himalayan journeys, quoted — never priced in public.",
  alternates: {
    canonical: canonical("/"),
    languages: { en: canonical("/"), "x-default": canonical("/") },
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
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${notoDevanagari.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <SkipLink />
            <SiteChrome>{children}</SiteChrome>
          </SmoothScroll>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
