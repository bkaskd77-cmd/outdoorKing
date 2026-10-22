import { brandName } from "@ok/config";
import { SkipLink } from "@ok/ui";
import { SmoothScroll } from "@ok/ui/motion";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { fraunces, inter, jetbrains, notoDevanagari } from "../../../fonts";
import "@ok/ui/globals.css";
import { routing } from "../../../i18n/routing";

export const metadata: Metadata = {
  title: {
    default: brandName,
    template: `%s · ${brandName}`,
  },
  description: "Private Himalayan journeys, quoted — never priced in public.",
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
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
