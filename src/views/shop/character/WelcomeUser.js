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
          setUserReady(true);
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
        harvestClamWarning({
          updateCharacter,
          setUserReady,
          setModalToShow,
        });
        // setUserReady(true);
        // updateCharacter({
        //   name: "diego",
        //   action: null,
        // });
        // setModalToShow("harvest");
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

const connectWallet = ({ updateCharacter, onConnect }) => {
  updateCharacter({
    name: "diego",
    action: "clam_presale.connect.text",
    button: {
      text: "Connect",
      alt: {
        action: "cb",
        destination: onConnect,
      },
    },
  });
};

export const WelcomeUser = ({
  updateCharacter,
  onConnect,
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
        onConnect,
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
                onConnect,
              });
            }
          },
        },
      },
      buttonAlt: {
        text: "What's the deal with Clams?",
        alt: {
          action: "cb",
          destination: (step = 1) => {
            updateCharacter({
              name: "diego",
              action: "clam_shop.intro.step" + step + ".text",
              button: {
                text: "Next",
                alt: {
                  action: "cb",
                  destination: () => {
                    if (step < 10) {
                      if (step == 2) {
                        updateCharacter({
                          name: "diego",
                          action: "clam_shop.intro.step" + (step + 1) + ".text",
                          buttonAlt: {
                            text: "Next",
                            alt: {
                              action: "cb",
                              destination: () => {
                                step++;
                                updateCharacter({
                                  name: "diego",
                                  action: "clam_shop.intro.step" + (step + 1) + ".text",
                                  button: {
                                    text: "Next",
                                    alt: {
                                      action: "cb",
                                      destination: () => {
                                        step++;
                                        if (step < 10) {
                                          updateCharacter({
                                            name: "diego",
                                            action: "clam_shop.intro.step" + (step + 1) + ".text",
                                          });
                                        } else {
                                          if (address) {
                                            updateCharacter({
                                              name: "diego",
                                              action: "clam_shop.choose_path.text",
                                              buttonAlt: harvestClamsBtn({
                                                updateCharacter,
                                                setUserReady,
                                                setModalToShow,
                                              }),
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
                                              onConnect,
                                            });
                                          }
                                        }
                                      },
                                    },
                                  },
                                });
                              },
                            },
                          },
                          button: {
                            text: "Find out more",
                            alt: {
                              action: "url",
                              destination:
                                "https://clamisland.medium.com/drop-rates-for-clam-traits-d62553430877",
                            },
                          },
                        });
                      } else {
                        updateCharacter({
                          name: "diego",
                          action: "clam_shop.intro.step" + (step + 1) + ".text",
                        });
                        step++;
                      }
                    }
                  },
                },
              },
            });
          },
        },
      },
    });
  }
};
