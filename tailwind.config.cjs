const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    plugins: [require("@tailwindcss/typography")],
    content: [
        "./src/**/*.{astro,css,json,ts,tsx}",
        "./src/content/skills/**/*.md",
    ],
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
                primary: colors.cyan,
                secondary: colors.amber,
                tertiary: colors.emerald,
                quaternary: colors.rose,
                gray: colors.neutral,
            },
            fontFamily: {
                sans: ['"Nunito"', ...defaultTheme.fontFamily.sans],
            },
        },
    },
};
