const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const gray = colors.zinc;

function hexStringToRGB(string) {
  const red = parseInt(string.slice(1, 3), 16);
  const green = parseInt(string.slice(3, 5), 16);
  const blue = parseInt(string.slice(5, 7), 16);

  return { red, green, blue };
}

function average(...numbers) {
  const sum = numbers.reduce((prev, curr) => prev + curr, 0);
  const avg = sum / numbers.length;

  return Math.round(avg);
}

function averageHexColors(color1, color2) {
  const rgb1 = hexStringToRGB(color1);
  const rgb2 = hexStringToRGB(color2);

  const avg = {
    red: average(rgb1.red, rgb2.red),
    green: average(rgb1.green, rgb2.green),
    blue: average(rgb1.blue, rgb2.blue),
  };

  return `#${avg.red.toString(16)}${avg.green.toString(16)}${avg.blue.toString(
    16
  )}`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@tailwindcss/typography")],
  content: ["./src/**/*.{astro,svelte,css,json,ts}"],
  darkMode: "class",
  theme: {
    keyframes: {
      blink: {
        "50%": {
          opacity: "0",
        },
      },
    },
    animation: {
      blink: "blink 530ms step-start infinite alternate",
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000",
        primary: colors.cyan,
        secondary: colors.amber,
        tertiary: colors.emerald,
        quaternary: colors.rose,
        gray: {
          ...gray,
          750: averageHexColors(gray[700], gray[800]),
        },
      },
      fontFamily: {
        sans: ['"Nunito"', ...defaultTheme.fontFamily.sans],
      },
      transitionDuration: {
        main: "200ms",
      },
    },
  },
};
