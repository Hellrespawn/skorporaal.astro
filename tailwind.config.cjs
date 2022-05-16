const colors = require('tailwindcss/colors');

module.exports = {
  plugins: [require('@tailwindcss/typography')],
  content: ['./src/**/*.html', './src/**/*.ejs'],
  theme: {
    colors: {
      gray: colors.stone,
      primary: colors.teal, // teal, cyan or sky?
      accent: colors.orange, // orange, amber, custom gold?
    },
    extend: {},
  },
  plugins: [],
};
