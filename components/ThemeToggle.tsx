"use client";

import { useTheme } from "next-themes";
import clsx from "clsx";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        "border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-800",
        "text-slate-700 dark:text-slate-200",
        "hover:bg-slate-100 dark:hover:bg-slate-700",
      )}
      aria-label="Toggle theme"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
