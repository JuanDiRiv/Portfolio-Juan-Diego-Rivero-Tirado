"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/types";
import { i18n } from "@/data/i18n";

const STORAGE_KEY = "portfolio.locale";
const EVENT_KEY = "portfolio:locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (typeof i18n)[Locale];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "en") return stored;

  const lang = window.navigator.language?.toLowerCase() ?? "";
  if (lang.startsWith("en")) return "en";
  return "es";
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => { };

  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  const onCustom = () => callback();

  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT_KEY, onCustom);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT_KEY, onCustom);
  };
}

function getSnapshot(): Locale {
  return getInitialLocale();
}

function getServerSnapshot(): Locale {
  return "es";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new Event(EVENT_KEY));
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: i18n[locale] }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
