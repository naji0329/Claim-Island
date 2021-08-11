module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxHeight: {
      159: "36em",
      160: "40em",
    },
    extend: {
      minWidth: {
        xs: "15rem",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    base: false,
    themes: ["emerald"],
  },
};
