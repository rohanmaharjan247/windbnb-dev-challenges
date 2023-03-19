const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['var(--primary-font)', ...fontFamily.sans]
    },
    extend: {
      colors: {
        primary: "#EB5757",
        "neutral-gray": "#BDBDBD"
      },
      fontSize: {
        "xxs": "9px"
      }
    },
  },
  plugins: [],
}
