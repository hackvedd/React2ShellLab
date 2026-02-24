import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        foreground: "#f8fafc",
        astracart: {
          crimson: "#dc2626",
          "crimson-glow": "rgba(220, 38, 38, 0.4)",
          navy: "#0f172a",
          dark: "#020617",
          border: "rgba(255, 255, 255, 0.05)",
        },
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: "0.99",
            textShadow:
              "-1px -1px 0 rgba(255, 255, 255, 0.4), 1px -1px 0 rgba(255, 255, 255, 0.4), -1px 1px 0 rgba(255, 255, 255, 0.4), 1px 1px 0 rgba(255, 255, 255, 0.4)",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: "0.4",
            textShadow: "none",
          },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px 2px rgba(220, 38, 38, 0.4)" },
          "50%": { boxShadow: "0 0 25px 4px rgba(220, 38, 38, 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "terminal-slide": {
          "0%": { transform: "translateY(0)", opacity: "0.1" },
          "50%": { opacity: "0.2" },
          "100%": { transform: "translateY(-50%)", opacity: "0.1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        flicker: "flicker 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        "terminal-slide": "terminal-slide 30s linear infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
