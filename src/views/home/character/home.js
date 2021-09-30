export const speechWelcome = ({ updateCharacter, date }, cb) => {
  updateCharacter({
    name: "nacre",
    action: "home.welcome.text",
    variables: { date },
    button: {
      text: "▶",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
  });
};

export const speechWelcomeOpen = ({ updateCharacter }) => {
  updateCharacter({
    name: "nacre",
    action: "home.first.text",
    button: {
      text: "Ok",
      dismiss: true,
    },
  });
};

export const speechLaunchCountdown = ({ updateCharacter }, cb) => {
  updateCharacter({
    name: "nacre",
    action: "home.launch.text",
    button: {
      text: "Great",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
  });
};

export const speechLaunchTwo = ({ updateCharacter }) => {
  updateCharacter({
    name: "nacre",
    action: "home.launch_two.text",
    button: {
      text: "Sounds good!",
      dismiss: true,
    },
  });
};

export const speechDismiss = ({ updateCharacter, date }) => {
  updateCharacter({
    name: "nacre",
    action: "home.dismiss.text",
    variables: { date },
    button: {
      text: "Great!",
      dismiss: true,
    },
  });
};
