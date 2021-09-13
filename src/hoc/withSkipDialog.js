import { useState, useEffect } from "react";
import { BUTTONS } from "../components/characters/constants";

export const withSkipDialog = (WrappedComponent) => (props) => {
  const [skipModal, setSkipModal] = useState({});

  const onSkipAccepted = () => {
    setSkipModal({});
    localStorage.setItem("skipDialogs", "true");
    props.updateCharacter({ skipDialogs: true });
  };

  const onSkipAccept = () => {
    setSkipModal({
      action: "skip.agree.text",
      button: {
        text: BUTTONS.skip.agree.next,
        alt: {
          action: "cb",
          destination: onSkipAccepted,
        },
      },
      buttonAlt: null,
    });
  };

  const onSkipDeclined = () => {
    setSkipModal({});
    localStorage.removeItem("skipDialogs");
    props.updateCharacter({ skipDialogs: false });
  };

  const onSkipDecline = () => {
    setSkipModal({
      action: "skip.disagree.text",
      button: {
        text: BUTTONS.skip.disagree.next,
        alt: {
          action: "cb",
          destination: onSkipDeclined,
        },
      },
      buttonAlt: null,
    });
  };

  const onClickSkipDialogButton = () => {
    setSkipModal({
      action: "skip.propose.text",
      button: {
        text: BUTTONS.skip.propose.next,
        alt: {
          action: "cb",
          destination: onSkipAccept,
        },
      },
      buttonAlt: {
        text: BUTTONS.skip.propose.alt,
        alt: {
          action: "cb",
          destination: onSkipDecline,
        },
      },
    });
  };

  useEffect(() => {
    props.updateCharacter({ skipDialogs: Boolean(localStorage.getItem("skipDialogs")) });
  }, []);

  return (
    <WrappedComponent {...props} onClickSkipDialogButton={onClickSkipDialogButton} {...skipModal} />
  );
};
