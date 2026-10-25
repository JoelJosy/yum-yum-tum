"use client";

import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: Theme;
  onToggle: () => void;
}) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="bg-background text-foreground border-border absolute top-2 right-2 z-20 flex size-8 items-center justify-center rounded-md border shadow-sm transition-colors hover:bg-accent"
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
    </button>
  );
}
