import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vix: {
          black: "#0B0B0F",
          anthracite: "#1A1A22",
          carbon: "#12121A",
          gold: "#D4AF37",
          "gold-light": "#E8C84A",
          "gold-dark": "#B8962E",
          white: "#F5F5F5",
          gray: "#8A8A9A",
          "gray-dark": "#3A3A4A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        section: [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        subtitle: [
          "clamp(1.1rem, 2vw, 1.35rem)",
          { lineHeight: "1.6" },
        ],
      },
      animation: {
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        breathe: "breathe 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #D4AF37 0%, #E8C84A 50%, #D4AF37 100%)",
        "dark-gradient":
          "linear-gradient(180deg, #0B0B0F 0%, #12121A 50%, #0B0B0F 100%)",
        "radial-gold":
          "radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
