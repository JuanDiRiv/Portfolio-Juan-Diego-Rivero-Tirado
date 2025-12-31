import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:opacity-90 shadow-sm shadow-black/5",
  secondary:
    "bg-muted text-foreground hover:bg-muted/80 border border-border",
  ghost: "hover:bg-muted/70 text-foreground",
};

const sizes = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  lg: "h-11 px-5",
} as const;

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: keyof typeof sizes;
}) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  external,
  ariaLabel,
  dataTrack,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  external?: boolean;
  ariaLabel?: string;
  dataTrack?: string;
}) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        className={cls}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        data-track={dataTrack}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={cls} href={href} aria-label={ariaLabel} data-track={dataTrack}>
      {children}
    </Link>
  );
}
