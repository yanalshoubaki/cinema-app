import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "min-xs": "640px",
      // => @media (min-width: 640px) { ... }
      "min-sm": "768px",
      // => @media (min-width: 768px) { ... }
      "min-md": "992px",
      // => @media (min-width: 992px) { ... }
      "min-lg": "1024px",
      // => @media (min-width: 1024px) { ... }
      "min-xl": "1280px",
      // => @media (min-width: 1280px) { ... }
      "min-xxl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "max-xxl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      "max-xl": { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      "max-lg": { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      "max-md": { max: "991px" },
      // => @media (max-width: 991px) { ... }
      "max-sm": { max: "767px" },
      // => @media (max-width: 767px) { ... }
      "max-xs": { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "15px",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;
