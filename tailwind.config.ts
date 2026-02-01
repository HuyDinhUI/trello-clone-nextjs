import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5", // indigo-600
          hover: "#6366F1",   // indigo-500
          active: "#4338CA",  // indigo-700
        },
        accent: {
          DEFAULT: "#22D3EE", // cyan-400
          soft: "#67E8F9",    // cyan-300
        },
        surface: {
          light: "#FFFFFF",
          dark: "#0F172A", // slate-900
        },
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
