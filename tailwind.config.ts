import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0A192F",
        "neon-blue": "#00F5FF",
        "electric-blue": "#2BEAFF",
        "neon-green": "#00FF88",
      },
      fontFamily: {
        display: ["var(--font-display)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "neon-blue": "0 0 5px #00F5FF, 0 0 20px rgba(0,245,255,0.35)",
        "neon-green": "0 0 5px #00FF88, 0 0 20px rgba(0,255,136,0.35)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        gridDrift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "80px 80px" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 22%, 24%, 55%": { opacity: "0.4" },
        },
      },
      animation: {
        scanline: "scanline 6s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        gridDrift: "gridDrift 12s linear infinite",
        flicker: "flicker 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
