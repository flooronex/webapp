"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { GB, PL, RO, RU, SA } from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils";

const flagComponents: Record<Locale, React.FC<{ className?: string }>> = {
  en: GB,
  ar: SA,
  ro: RO,
  ru: RU,
  pl: PL
};

const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ro: "Română",
  ru: "Русский",
  pl: "Polski"
};

interface MobileLanguageSwitcherProps {
  className?: string;
}

export function MobileLanguageSwitcher({
  className,
}: MobileLanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
        Language
      </span>
      <div className="flex gap-2">
        {routing.locales.map((loc) => {
          const Flag = flagComponents[loc];
          const isActive = locale === loc;

          return (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                "hover:bg-[var(--surface-hover)]",
                isActive &&
                  "bg-[var(--surface-tertiary)] ring-1 ring-[var(--border-primary)]"
              )}
              aria-label={`Switch to ${localeNames[loc]}`}
              aria-pressed={isActive}
            >
              <Flag className="w-5 h-4 rounded-sm shrink-0" />
              <span className="text-sm font-medium">{localeNames[loc]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
