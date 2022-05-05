const FARM_WITHDRAW_COLOR = "#FF4B47";
const THEME_BLUE = "#0576e2";

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
      60: 60,
      999: 999,
      9998: 9998,
      9999: 9999,
      10000: 10000
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      withdraw: FARM_WITHDRAW_COLOR,
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      withdraw: FARM_WITHDRAW_COLOR,
      theme_blue: THEME_BLUE,
    }),
    backgroundColor: (theme) => ({
      ...theme("colors"),
      withdraw: FARM_WITHDRAW_COLOR,
      darkPearl: "#38DCDC",
    }),
    fontFamily: {
      avenir: ["AvenirBlack"],
      montserrat: ["Montserrat-Medium"],
      aristotelica: ["AristotelicaBold"],
    },
    extend: {
      screens: {
        xs: '420px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        // 16: "repeat(16, minmax(0, 1fr))",
      },
      minWidth: {
        xs: "15rem",
        180: "180px",
      },
      maxWidth: {
        canvas: "400px",
        325: "325px",
      },
      height: {
        canvas: "400px",
      },
      width: {
        "7/10": "70%",
        canvas: "400px",
      },
      dropShadow: {
        center: "0 0 5px rgba(0, 0, 0, 0.5)",
        border: "0 0 1px rgba(0, 0, 0, 1)",
        button: "0 2px 3px black",
      },
      spacing: {
        "4%": "4%",
      },
      inset: {
        "1/10": "10%",
      },
      colors: {
        'pri-color': '#0072E3',
      },
    },
  },
  variants: {
    extend: {
      //opacity: ["disabled"],
      cursor: ["active"],
      backdropBlur: ["hover"],
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    base: false,
    themes: ["emerald"],
  },
};
