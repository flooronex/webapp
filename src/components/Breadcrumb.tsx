"use client";

import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const t = useTranslations("common");
  return (
    <nav aria-label="Breadcrumb" className={cn("relative z-10", className)}>
      <ol className="flex items-center flex-wrap gap-1 sm:gap-2 text-sm">
        {/* Home */}
        <li className="flex items-center">
          <Link
            href={`/`}
            className="flex items-center gap-1 text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200"
          >
            <IconHome className="w-4 h-4" />
            <span className="hidden sm:inline">{t("Header.home")}</span>
          </Link>
        </li>

        {/* Separator after home */}
        <li
          className="flex items-center text-(--text-muted)/50"
          aria-hidden="true"
        >
          <IconChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              <div className="flex items-center gap-1 sm:gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 truncate max-w-25 sm:max-w-37.5 md:max-w-none"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "truncate max-w-30 sm:max-w-45 md:max-w-none",
                      isLast
                        ? "text-(--text-primary) font-medium"
                        : "text-(--text-muted)"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}

                {/* Separator */}
                {!isLast && (
                  <span className="text-(--text-muted)/50" aria-hidden="true">
                    <IconChevronRight className="w-3.5 h-3.5  rtl:rotate-180" />
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
