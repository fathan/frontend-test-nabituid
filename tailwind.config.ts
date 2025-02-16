import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        "blue-dark-primary": "#1c1a33",
        "purple-primary": "#3e56dc",
        "green-primary": "#299554",
        "green-secondary": "#3fd29a",
        "danger-primary": "#d14255",
        "warning-primary": "#fda62c",
        "background-primary": "#f1f5f9",
        "background-secondary": "#e2e8f0",
        "support-primary": "#1c2433",
        "support-secondary": "#9d9d9d",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
