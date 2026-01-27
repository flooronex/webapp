"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  enabled,
  onToggle,
  ariaLabel = "Toggle",
  disabled = false,
  className,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onToggle(!enabled)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-(--border-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--surface-primary)",
        enabled ? "bg-(--foreground)" : "bg-(--border-secondary)",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-(--background) shadow-lg ring-0 transition duration-200 ease-in-out",
          enabled ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
