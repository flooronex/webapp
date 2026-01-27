"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Theme } from "@/types";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  const applyTheme = useCallback((newTheme: Theme) => {
    const resolvedTheme =
      newTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : newTheme;

    // Add class to disable all transitions during theme switch
    document.documentElement.classList.add("theme-switching");

    // Update the HTML class for Tailwind's dark mode
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Keep the data-theme attribute for backward compatibility
    document.documentElement.dataset.theme = resolvedTheme;

    // Update local storage
    localStorage.setItem("theme", newTheme);

    // Remove the transition-disabling class after a frame to allow normal transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("theme-switching");
      });
    });
  }, []);

  useEffect(() => {
    // Check local storage or system preference for initial theme
    const savedTheme = localStorage.getItem("theme") as Theme;
    const initialTheme = savedTheme || "dark";
    setThemeState(initialTheme);
    applyTheme(initialTheme);

    // Listen for system theme changes if using system theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (localStorage.getItem("theme") === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [applyTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
