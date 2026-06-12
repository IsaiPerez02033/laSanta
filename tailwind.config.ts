import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#0a0a0a",
          900: "#121212",
          800: "#1a1a1a",
          700: "#262626",
        },
        ember: {
          400: "#ff8c42",
          500: "#ff6b1a",
          600: "#e85d04",
        },
      },
      fontFamily: {
        display: [
          "Helvetica Neue",
          "Arial Narrow",
          "Arial",
          "sans-serif",
        ],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
