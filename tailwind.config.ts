import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "cz-blue-700": "rgb(11, 35, 65)",
        "cz-blue-600": "rgb(25, 20, 43)",
        "cz-blue-500": "rgb(43, 44, 110)",
        "cz-blue-400": "rgb(79, 96, 118)",
        "cz-blue-300": "rgb(105, 162, 255)",
        "cz-gray-700": "rgb(236, 235, 231)",
        "cz-gray-600": "rgb(208, 206, 196)",
        "cz-gray-500": "rgb(247, 248, 246)",
        "cz-orange-100": "rgb(179, 92, 30)",
      },
      fontFamily: {
        campton: ["var(--font-campton)", "sans-serif"],
        larsseit: ["var(--font-larsseit)", "sans-serif"], 
        quincy: ["var(--font-quincy)", "sans-serif"],
        quincyCF: ["var(--font-quincy-cf)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
