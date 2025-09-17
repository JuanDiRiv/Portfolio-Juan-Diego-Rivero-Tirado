"use client";

import { useTheme } from "@/context/ThemeContext";

type ThemeToggleProps = {
  ariaLabel: string;
  className?: string;
  iconClassName?: string;
};

export function ThemeToggle({
  ariaLabel,
  className = "",
  iconClassName = "",
}: ThemeToggleProps) {
  const { theme, toggleTheme, isHydrated } = useTheme();

  const buttonClass = `group inline-flex h-10 w-10 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${className}`;
  const iconBaseClass = `h-5 w-5 transition-transform duration-500 ${iconClassName}`;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={toggleTheme}
      className={buttonClass}
    >
      {isHydrated ? (
        theme === "dark" ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`${iconBaseClass} group-hover:rotate-12`}
            fill="currentColor"
          >
            <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-10.45-10.5 1 1 0 0 0-1.12-1.32 10 10 0 1 0 12.54 12.54A1 1 0 0 0 21.64 13Z" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`${iconBaseClass} group-hover:-rotate-12`}
            fill="currentColor"
          >
            <path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 0 1-2 0V5.5a1 1 0 0 1 1-1Zm0 10.5a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm7-3a1 1 0 0 1 1 1V14a1 1 0 0 1-2 0v-1.5a1 1 0 0 1 1-1Zm-14 0a1 1 0 0 1 1 1V14a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1Zm12.07 6.57a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 1 1-1.41 1.41L17.07 19.5a1 1 0 0 1 0-1.41Zm-12.14 0a1 1 0 0 1 0 1.41L4.87 20.9a1 1 0 0 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 0ZM12 17a1 1 0 0 1 1 1v1.5a1 1 0 0 1-2 0V18a1 1 0 0 1 1-1Zm9-12.5-1.06 1.06a1 1 0 1 1-1.41-1.41L19.5 3.1a1 1 0 0 1 1.41 1.41Zm-15 0a1 1 0 0 1-1.41 0L3.1 4.87A1 1 0 0 1 4.51 3.46L5.57 4.5a1 1 0 0 1 0 1.41Z" />
          </svg>
        )
      ) : (
        <span aria-hidden className={iconBaseClass} />
      )}
    </button>
  );
}
