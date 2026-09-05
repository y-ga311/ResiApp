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
        // harema風の暖かなオレンジ／クリーム基調
        accent:     "#E8895B",
        "accent-lt": "#FFE8D6",
        bg:         "#FFF8EE",
        card:       "#FFFFFF",
        t1:         "#4A3321",
        t2:         "#6B5344",
        t3:         "#A89080",
        good:       "#27AE76",
        warn:       "#FBBF24",
        stroke:     "#F0E4D8",
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
