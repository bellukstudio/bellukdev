import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
  className?: string;
  target?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  variant = "primary",
  children,
  className,
  target,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-mono text-sm tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue",
    variant === "primary" &&
      "bg-neon-blue/10 text-neon-blue border border-neon-blue/60 hover:bg-neon-blue/20 hover:shadow-neon-blue",
    variant === "ghost" &&
      "border border-neon-green/40 text-neon-green hover:bg-neon-green/10 hover:shadow-neon-green",
    className
  );

  if (href) {
    return (
      <Link href={href} target={target} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
