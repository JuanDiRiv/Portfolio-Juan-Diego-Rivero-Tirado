import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 bg-card/80 shadow-sm backdrop-blur-sm transition-all",
        className
      )}
    >
      {children}
    </div>
  );
}
