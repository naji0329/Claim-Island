import React, { useState } from "react";
import { useLocalStorage } from "react-use";

import { IS_LITE_VERSION } from "constants/ui";

import "./LiteVersionSwitcher.css";

export const LiteVersionSwitcher = () => {
  const [isLiteVersion, setIsLiteVersion] = useLocalStorage(IS_LITE_VERSION);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    setIsLiteVersion(!isLiteVersion);
    document.location.reload();
  };

  return (
    <button className="switchButton" onClick={handleClick} disabled={isDisabled}>
      {isLiteVersion ? "Switch to Full version" : "Switch to Lite version"}
    </button>
  );
};
