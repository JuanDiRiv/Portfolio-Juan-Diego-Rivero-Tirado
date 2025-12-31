"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/features/preferences/LocaleProvider";
import { ThemeProvider } from "@/features/preferences/ThemeProvider";
import { ClickTracker } from "@/components/analytics/ClickTracker";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <ClickTracker />
        {children}
      </LocaleProvider>
    </ThemeProvider>
  );
}
