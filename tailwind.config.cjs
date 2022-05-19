const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  plugins: [require('@tailwindcss/typography')],
  content: ['./src/**/*.{html,njk,css,json}', './util/**/*.js'],
  darkMode: 'class',
  theme: {
    keyframes: {
      blink: {
        '50%': {
          opacity: '0',
        },
      },
    },
    animation: {
      blink: 'blink 530ms step-start infinite alternate',
    },
    extend: {
      colors: {
        primary: colors.cyan, // teal, cyan or sky?
        accent: colors.amber, // orange, amber, custom gold?
      },
      fontFamily: {
        sans: ['"Nunito"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
