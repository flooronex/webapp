"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "@/providers";
import { IconButton } from "@/components/ui";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      icon={
        theme === "dark" ? (
          <IconSun className="w-4 h-4" />
        ) : (
          <IconMoon className="w-4 h-4" />
        )
      }
      aria-label="Toggle theme"
    />
  );
}
