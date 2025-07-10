import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#ef4444", // red-500
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#374151", // gray-700
          foreground: "#f9fafb", // gray-50
        },
        destructive: {
          DEFAULT: "#dc2626", // red-600
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1f2937", // gray-800
          foreground: "#9ca3af", // gray-400
        },
        accent: {
          DEFAULT: "#1f2937", // gray-800
          foreground: "#f9fafb", // gray-50
        },
        popover: {
          DEFAULT: "#111827", // gray-900
          foreground: "#f9fafb", // gray-50
        },
        card: {
          DEFAULT: "#1f2937", // gray-800
          foreground: "#f9fafb", // gray-50
        },
        // Exploit brand colors
        exploit: {
          red: "#ef4444",
          "red-dark": "#dc2626",
          gray: "#374151",
          "gray-dark": "#1f2937",
          "gray-darker": "#111827",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-from-bottom-4": {
          from: { transform: "translateY(1rem)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-red": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(239, 68, 68, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-from-bottom-4": "slide-in-from-bottom-4 0.3s ease-out",
        "pulse-red": "pulse-red 2s infinite",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
