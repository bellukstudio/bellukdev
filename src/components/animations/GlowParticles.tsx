"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Particle = {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
};

/** Slow-drifting glow particles, like dust catching neon light. */
export function GlowParticles({ count = 24 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, id) => ({
      id,
      x: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 8,
      color: id % 3 === 0 ? "#00FF88" : "#00F5FF",
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
          initial={{ top: "110%", opacity: 0 }}
          animate={{ top: "-10%", opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
