"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.a
      href="#overview"
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neon-blue/70"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Scroll to overview"
    >
      <ChevronDown size={28} />
    </motion.a>
  );
}
