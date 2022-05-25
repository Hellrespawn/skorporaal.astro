const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  plugins: [require('@tailwindcss/typography')],
  content: ['./src/**/*.{html,njk,css,json,ts}', './util/**/*.js'],
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
      boxShadow: {
        mdlg: '0 7px 11px -2px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        primary: colors.cyan, // teal, cyan or sky?
        accent: colors.amber, // orange, amber, custom gold?
        zinc: {
          750: '#333338',
        },
      },
      fontFamily: {
        sans: ['"Nunito"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
