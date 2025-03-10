/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: ["12px", "150%"],
      base: ["14px", "140%"],
      lg: ["16px", "140%"],
      xl: ["22px", "130%"],
      "2xl": ["29px", "110%"],
      "3xl": ["34px", "105%"],
      "4xl": ["42px", "105%"],
      "5xl": ["61px", "120%"],
      "6xl": ["82px", "100%"],
      "7xl": ["128px", "100%"],
    },
    extend: {
      colors: {
        fake: "#f8a05440",
        current: "currentColor",
        butter: {
          DEFAULT: "#FFD700",
          50: "#FFFFFF",
          100: "#FFFDF0",
          200: "#FFF9C7",
          300: "#FFF590",
          400: "#FFE9B2",
          500: "#FFD700",
          600: "#F6892A",
          700: "#998500",
          800: "#665400",
          900: "#332300",
        },
        ewhite: "#FFFDF5",
        electric: {
          DEFAULT: "#FFD700",
          50: "#FFFFFF",
          100: "#FFFEF0",
          200: "#FFFCB9",
          300: "#FFF982",
          400: "#FBCFA8",
          500: "#F8A054",
          600: "#F6892A",
          700: "#998500",
          800: "#665400",
          900: "#332300",
        },
        eblue: {
          DEFAULT: "#2A4BCC",
          100: "#EFF2FC",
          200: "#DBE1F7",
          600: "#2A4BCC",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)"],
        monarcha: ["Monarcha", ...defaultTheme.fontFamily.serif],
      },
      typography: {},
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: 0 },
          to: { height: "var(--radix-accordion-content-height)", opacity: 1 },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: 1 },
          to: { height: "0", opacity: 0 },
        },
        wiggle: {
          "0%, 100%": {
            transform: "translateX(0%)",
            transformOrigin: "50% 50%",
          },
          "15%": { transform: "translateX(-6px) rotate(-6deg)" },
          "30%": { transform: "translateX(9px) rotate(6deg)" },
          "45%": { transform: "translateX(-9px) rotate(-3.6deg)" },
          "60%": { transform: "translateX(3px) rotate(2.4deg)" },
          "75%": { transform: "translateX(-2px) rotate(-1.2deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.8s both",
        "accordion-down": "accordion-down 0.6s ease-in-out",
        "accordion-up": "accordion-up 0.6s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
