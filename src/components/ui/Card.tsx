import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

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
        "rounded-lg border border-neon-blue/15 bg-surface/40 backdrop-blur-sm",
        "transition-all duration-300 hover:border-neon-blue/50 hover:shadow-neon-blue",
        className
      )}
    >
      {children}
    </div>
  );
}
