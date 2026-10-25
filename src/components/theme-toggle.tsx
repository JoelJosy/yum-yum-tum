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
      className="absolute top-2 right-2 z-20 flex size-8 items-center justify-center border border-[#ff6f18]/70 bg-[#1b1b1b]/90 text-[#ff6f18] shadow-[2px_2px_0_#ff6f18] backdrop-blur-sm transition-colors hover:bg-[#ff6f18] hover:text-[#1b1b1b]"
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
    </button>
  );
}
