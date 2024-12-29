/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        current: "currentColor",
        ewhite: '#FFFDF5',
        'electric': {
          DEFAULT: '#FFD700',
          '50': '#FFFFFF',
          '100': '#FFFEF0',
          '200': '#FFFCB9',
          '300': '#FFF982',
          '400': '#FBCFA8',
          '500': '#F8A054',
          '600': '#F6892A',
          '700': '#998500',
          '800': '#665400',
          '900': '#332300'
        },
        eblue: '#2A4BCC'
      },
      fontFamily: {
        outfit: ["Outfit", ...defaultTheme.fontFamily.serif],
        monarcha: ["Monarcha", "Inter var",...defaultTheme.fontFamily.serif],
        'monarcha-bold': ["MonarchaBold", ...defaultTheme.fontFamily.serif],
      },
      typography: {},
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
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
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
