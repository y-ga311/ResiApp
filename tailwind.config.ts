import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent:     "#1B3A6B",
        "accent-lt": "#DBE8FF",
        bg:         "#F0F4FF",
        card:       "#FFFFFF",
        t1:         "#1A1F2E",
        t2:         "#475569",
        t3:         "#94A3B8",
        good:       "#27AE76",
        warn:       "#FBBF24",
        stroke:     "#E2E8F0",
        sk1:        "#10B981",
        sk2:        "#818CF8",
        sk3:        "#FB923C",
        sk4:        "#F472B6",
        sk5:        "#38BDF8",
      },
      fontFamily: {
        sans: ["Inter", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
