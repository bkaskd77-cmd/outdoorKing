"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

import { PublicMenu, PublicMenuAction, PublicMenuLink } from "./PublicMenu";

const LABELS: Record<string, string> = {
  en: "localeEn",
  de: "localeDe",
  fr: "localeFr",
  "zh-Hans": "localeZhHans",
};

function MenuMark() {
  return (
    <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
      <span className="block h-px w-full bg-current" />
      <span className="block h-px w-full bg-current" />
      <span className="block h-px w-full bg-current" />
    </span>
  );
}

export function MobilePublicMenu({
  regions,
}: {
  regions: readonly { href: string; label: string }[];
}) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="xl:hidden">
      <PublicMenu
        id="mobile"
        variant="boxed"
        align="end"
        ariaLabel={t("navMenu")}
        label={<MenuMark />}
      >
        <PublicMenuLink href="/purpose" className="font-semibold">
          {t("navPurpose")}
        </PublicMenuLink>
        <PublicMenuLink href="/activities">{t("navActivities")}</PublicMenuLink>
        {regions.map((item) => (
          <PublicMenuLink key={item.href} href={item.href}>
            {item.label}
          </PublicMenuLink>
        ))}
        <PublicMenuLink href="/trips">{t("navTrips")}</PublicMenuLink>
        <PublicMenuLink href="/trust/licence-and-legal">
          {t("navTrust")}
        </PublicMenuLink>
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
    </div>
  );
}
