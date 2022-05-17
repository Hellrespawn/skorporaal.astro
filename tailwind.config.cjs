const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  plugins: [require('@tailwindcss/typography')],
  content: ['./src/**/*.html', './src/**/*.ejs'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.stone,
      primary: colors.teal, // teal, cyan or sky?
      accent: colors.orange, // orange, amber, custom gold?
    },
    extend: {
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
      fontFamily: {
        sans: ['"Nunito"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
};
