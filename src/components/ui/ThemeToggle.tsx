"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { useTheme } from "@/features/preferences/ThemeProvider";

export function ThemeToggle() {
  const { t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={t.common.theme}
      className="border border-transparent hover:border-border cursor-pointer"
      data-track="toggle_theme"
    >
      <Icon
        name={theme === "dark" ? "theme-dark" : "theme-light"}
        className="h-4 w-4"
      />
      <span className="sr-only">{t.common.theme}</span>
    </Button>
  );
}
