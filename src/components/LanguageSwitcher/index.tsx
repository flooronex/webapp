"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { GB, PL, RO, RU, SA } from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const flagComponents: Record<Locale, React.FC<{ className?: string }>> = {
  en: GB,
  ar: SA,
  ro: RO,
  ru: RU,
  pl: PL
};

const localeIsoCodes: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
  ro: "RO",
  ru: "RU",
  pl: "PL"
};

const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ro: "Română",
  ru: "Русский",
  pl: "Polski"
};

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const CurrentFlag = flagComponents[locale];

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as Locale });
  };

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger
        variant="ghost"
        hideIcon
        size="sm"
        className={cn("gap-2", className)}
        aria-label="Select language"
      >
        <CurrentFlag className="w-3.5 h-3 rounded-sm shrink-0" />
        <span className="text-sm">{localeIsoCodes[locale]}</span>
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((loc) => {
          const Flag = flagComponents[loc];

          return (
            <SelectItem key={loc} value={loc}>
              <Flag className="w-3.5 h-3 rounded-sm shrink-0" />
              <span>{localeIsoCodes[loc]}</span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default LanguageSwitcher;
