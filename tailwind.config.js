const FARM_WITHDRAW_COLOR = "#FF4B47";

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    cursor: {
      auto: "auto",
      default: "default",
      pointer: "pointer",
      wait: "wait",
      text: "text",
      move: "move",
      "not-allowed": "not-allowed",
      grab: "grab",
      grabbing: "grabbing",
    },
    maxHeight: {
      159: "36em",
      160: "40em",
    },
    zIndex: {
      "-1": "-1",
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      withdraw: FARM_WITHDRAW_COLOR,
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      withdraw: FARM_WITHDRAW_COLOR,
    }),
    fontFamily: {
      avenir: ["AvenirBlack"],
      montserrat: ["Montserrat-Medium"],
      aristotelica: ["AristotelicaBold"],
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        16: "repeat(16, minmax(0, 1fr))",
      },
      minWidth: {
        xs: "15rem",
      },
      maxWidth: {
        canvas: "400px",
      },
      height: {
        canvas: "400px",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["active"],
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    base: false,
    themes: ["emerald"],
  },
};
