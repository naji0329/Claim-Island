module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxHeight: {
      '159' : '36em',
      '160' : '40em',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
