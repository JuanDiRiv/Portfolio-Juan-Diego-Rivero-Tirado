import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground",
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}
