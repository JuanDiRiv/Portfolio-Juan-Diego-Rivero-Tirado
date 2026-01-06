"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/features/preferences/LocaleProvider";

export function LocaleToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "es" ? "en" : "es")}
      aria-label={t.common.language}
      className="border border-transparent hover:border-border cursor-pointer"
      data-track="toggle_locale"
    >
      <span className="text-xs font-semibold tracking-wide">
        {locale === "es" ? "ES" : "EN"}
      </span>
    </Button>
  );
}
