"use client";

import { useMousePosition } from "@/hooks/useMousePosition";

/** Soft radial glow that follows the cursor, like a scanner light. */
export function MouseGlow() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,245,255,0.06), transparent 40%)`,
      }}
      aria-hidden
    />
  );
}
