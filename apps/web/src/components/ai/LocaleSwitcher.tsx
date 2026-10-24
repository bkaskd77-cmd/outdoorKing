"use client";

import { useLocale, useTranslations } from "next-intl";

import { PublicMenu, PublicMenuAction } from "@/components/marketing/PublicMenu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  en: "localeEn",
  de: "localeDe",
  fr: "localeFr",
  "zh-Hans": "localeZhHans",
};

export function LocaleSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <PublicMenu
      id="locale"
      variant="boxed"
      align="end"
      ariaLabel={t("localeSwitcher")}
      label={t(LABELS[locale] ?? "localeEn")}
    >
      {routing.locales.map((code) => (
        <PublicMenuAction
          key={code}
          current={code === locale}
          onSelect={() => {
            router.replace(pathname, { locale: code as AppLocale });
          }}
        >
          {t(LABELS[code] ?? "localeEn")}
        </PublicMenuAction>
      ))}
    </PublicMenu>
  );
}
