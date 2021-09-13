export const harvestClamWarning = ({ updateCharacter, setUserReady, setModalToShow }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.harvest_warn.text",
    button: {
      text: "Yes",
      alt: {
        action: "cb",
        destination: () => {
          setUserReady(true);
          updateCharacter({
            name: "diego",
            action: null,
          });
          setModalToShow("harvest");
        },
      },
    },
    buttonAlt: {
      text: "No, I want to buy Clams instead.",
      alt: {
        action: "cb",
        destination: () => {
          updateCharacter({
            name: "diego",
            action: null,
          });
          setModalToShow("buy");
        },
      },
    },
  });
};

const harvestClamsBtn = ({ updateCharacter, setUserReady, setModalToShow }) => {
  return {
    text: "Harvest Clams",
    alt: {
      action: "cb",
      destination: () => {
        setUserReady(true);
        updateCharacter({
          name: "diego",
          action: null,
        });
        setModalToShow("harvest");
      },
    },
  };
};

const buyClamsBtn = ({ updateCharacter, setUserReady, setModalToShow, clamToCollect }) => {
  return {
    text: "Buy Clams",
    alt: {
      action: "cb",
      destination: () => {
        setUserReady(true);

        console.log("clamToCollect", clamToCollect);
        if (clamToCollect) {
          updateCharacter({
            name: "diego",
            action: "clam_shop.collect.text",
            button: {
              text: "Got it, Boss",
              dismiss: true,
            },
          });
          setModalToShow("collect");
        } else {
          updateCharacter({
            name: "diego",
            action: null,
          });
          setModalToShow("buy");
        }
      },
    },
  };
};

const connectWallet = ({ updateCharacter, activateBrowserWallet }) => {
  updateCharacter({
    name: "diego",
    action: "clam_presale.connect.text",
    button: {
      text: "Connect",
      alt: {
        action: "cb",
        destination: activateBrowserWallet,
      },
    },
  });
};

export const WelcomeUser = ({
  updateCharacter,
  activateBrowserWallet,
  address,
  setModalToShow,
  setUserReady,
  clamToCollect,
  skipDialogs,
}) => {
  if (skipDialogs) {
    if (address) {
      updateCharacter({
        name: "diego",
        action: "clam_shop.choose_path.text",
        buttonAlt: harvestClamsBtn({ updateCharacter, setUserReady, setModalToShow }),
        button: buyClamsBtn({
          updateCharacter,
          setUserReady,
          setModalToShow,
          clamToCollect,
        }),
      });
    } else {
      connectWallet({
        updateCharacter,
        activateBrowserWallet,
      });
    }
  } else {
    updateCharacter({
      name: "diego",
      action: "clam_shop.welcome.text",
      button: {
        text: "Let's go!",
        alt: {
          action: "cb",
          destination: () => {
            if (address) {
              updateCharacter({
                name: "diego",
                action: "clam_shop.choose_path.text",
                buttonAlt: harvestClamsBtn({ updateCharacter, setUserReady, setModalToShow }),
                button: buyClamsBtn({
                  updateCharacter,
                  setUserReady,
                  setModalToShow,
                  clamToCollect,
                }),
              });
            } else {
              connectWallet({
                updateCharacter,
                activateBrowserWallet,
              });
            }
          },
        },
      },
    });
  }
};
