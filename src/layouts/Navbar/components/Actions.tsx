"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components";
import { ThemeToggle } from "./ThemeToggle";

interface ActionsProps {
  scrolled: boolean;
  actions: {
    login?: {
      label: string;
      onClick?: () => void;
    };
    cta?: {
      label: string;
      onClick?: () => void;
      variant?: "secondary" | "default";
    };
  };
  onMobileMenuOpen: () => void;
  mobileMenuLabel: string;
}

export function Actions({
  scrolled,
  actions,
  onMobileMenuOpen,
  mobileMenuLabel,
}: ActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 min-w-[30%]">
      <div className="hidden md:flex">
        <LanguageSwitcher />
      </div>
      <ThemeToggle />

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        {actions.login && (
          <Button
            onClick={actions.login.onClick}
            variant="ghost"
            size="sm"
            className={cn(
              scrolled
                ? "opacity-0 w-0 p-0 m-0 translate-x-20"
                : "opacity-100 w-auto"
            )}
            aria-label={actions.login.label}
          >
            {actions.login.label}
          </Button>
        )}
        {actions.cta && (
          <Button
            onClick={actions.cta.onClick}
            variant={actions.cta.variant || "default"}
            size="sm"
            aria-label={actions.cta.label}
          >
            {actions.cta.label}
          </Button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <Button
        onClick={onMobileMenuOpen}
        className="md:hidden p-2 hover:opacity-70 transition-opacity"
        variant="ghost"
        aria-label={mobileMenuLabel}
      >
        <svg
          className="min-w-4.5 min-h-4.5 w-4.5 h-4.5 md:min-w-6 md:min-h-6 md:w-6 md:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span className="sr-only">{mobileMenuLabel}</span>
      </Button>
    </div>
  );
}
