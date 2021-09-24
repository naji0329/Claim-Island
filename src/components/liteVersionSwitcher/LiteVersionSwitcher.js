import React, { useEffect, useState } from "react";

import { checkLiteVersion } from "utils/checkLiteVersion";

import "./LiteVersionSwitcher.css";

export const LiteVersionSwitcher = () => {
  const [isLiteVersion, setIsLiteVersion] = useState(false);

  const handleClick = () => {
    localStorage.setItem("isLiteVersion", JSON.stringify(!isLiteVersion));
    document.location.reload();
  };

  useEffect(() => {
    const isLiteVersion = checkLiteVersion();
    setIsLiteVersion(isLiteVersion);
  }, []);

  return (
    <button className="switcherButton" onClick={handleClick}>
      {isLiteVersion ? "Switch to Full version" : "Switch to Lite version"}
    </button>
  );
};
