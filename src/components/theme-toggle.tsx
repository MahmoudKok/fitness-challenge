"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const STORAGE_KEY = "fitness-challenge-theme";

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  const theme = window.localStorage.getItem(STORAGE_KEY);
  return theme === "dark" || theme === "light" ? theme : null;
}

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialTheme(): Theme {
  return getStoredTheme() ?? getPreferredTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className="focus-ring inline-flex h-11 items-center gap-2 rounded-button border border-border bg-surface p-1 text-sm font-extrabold text-text shadow-soft transition-colors hover:border-primary"
      onClick={toggleTheme}
      suppressHydrationWarning
      type="button"
    >
      <span className={cn("theme-toggle__label", !isDark && "theme-toggle__label--active")}>
        Light
      </span>
      <span
        className={cn(
          "theme-toggle__track",
          isDark && "theme-toggle__track--dark",
        )}
        aria-hidden="true"
      >
        <span className="theme-toggle__thumb" />
      </span>
      <span className={cn("theme-toggle__label", isDark && "theme-toggle__label--active")}>
        Dark
      </span>
    </button>
  );
}
