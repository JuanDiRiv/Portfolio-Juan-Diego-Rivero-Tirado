"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/features/preferences/LocaleProvider";
import { ThemeProvider } from "@/features/preferences/ThemeProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
