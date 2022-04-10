import { useEffect } from "react";
import { connect } from "redux-zero/react";

import { actions } from "store/redux";
import { welcomeUser, guideUser } from "./character/userGuide";

const InfocenterContentComponent = ({ updateCharacter, skipDialogs }) => {
  useEffect(() => {
    if (skipDialogs) {
      guideUser(updateCharacter);
    } else {
      welcomeUser(updateCharacter);
    }
  }, [skipDialogs]);

  return <></>;
};

const mapToProps = ({ character: { skipDialogs } }) => ({ skipDialogs });
const mapDispatchToProps = () => ({ updateCharacter: actions().updateCharacter });
export const InfocenterContent = connect(
  mapToProps,
  mapDispatchToProps
)(InfocenterContentComponent);
