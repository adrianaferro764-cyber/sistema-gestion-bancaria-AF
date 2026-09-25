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
        bbva: {
          navy: "#004481",
          dark: "#072146",
          blue: "#1464A5",
          medium: "#1973B8",
          light: "#00A9E0",
          sky: "#5AC4E5",
          aqua: "#028484",
          soft: "#F4F6F9",
          border: "#DDE3EA",
          grayText: "#6B7280"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
