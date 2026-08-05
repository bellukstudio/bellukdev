"use client";

import { motion } from "framer-motion";

/**
 * Animated grid + traveling "electric" lines that sweep across the grid,
 * evoking current running through a circuit board.
 */
export function ElectricLines() {
  const horizontalPaths = [12, 34, 58, 76];
  const verticalPaths = [18, 42, 65, 84];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base grid */}
      <div
        className="absolute inset-0 animate-gridDrift opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      {/* Traveling electric pulses along horizontal lines */}
      {horizontalPaths.map((top, i) => (
        <motion.div
          key={`h-${top}`}
          className="absolute h-px w-1/3"
          style={{
            top: `${top}%`,
            background:
              "linear-gradient(90deg, transparent, #00F5FF, transparent)",
          }}
          initial={{ left: "-33%" }}
          animate={{ left: "100%" }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.3,
          }}
          aria-hidden
        />
      ))}

      {/* Traveling electric pulses along vertical lines */}
      {verticalPaths.map((left, i) => (
        <motion.div
          key={`v-${left}`}
          className="absolute w-px h-1/3"
          style={{
            left: `${left}%`,
            background:
              "linear-gradient(180deg, transparent, #00FF88, transparent)",
          }}
          initial={{ top: "-33%" }}
          animate={{ top: "100%" }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.7,
          }}
          aria-hidden
        />
      ))}
    </div>
  );
}
