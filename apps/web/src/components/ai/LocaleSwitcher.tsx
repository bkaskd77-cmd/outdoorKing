"use client";

import { useLocale, useTranslations } from "next-intl";

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
    <label className="flex items-center gap-2 text-caption">
      <span className="sr-only">{t("localeSwitcher")}</span>
      <select
        aria-label={t("localeSwitcher")}
        className="min-h-11 rounded-md border border-border bg-surface px-2 text-small"
        value={locale}
        onChange={(event) => {
          const next = event.target.value as AppLocale;
          router.replace(pathname, { locale: next });
        }}
      >
        {routing.locales.map((code) => (
          <option key={code} value={code}>
            {t(LABELS[code] ?? "localeEn")}
          </option>
        ))}
      </select>
    </label>
  );
}
