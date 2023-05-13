const colors  = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      zinc: colors.zinc,
      neutral: colors.neutral,
      brand: {
        300: "#996DFF",
        500: "#8257e6",
      }
    },
    BorderRadius: {
      md: '4px'
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}