import React from "react";
import clamIcon from "assets/clam-icon.png";
import "./index.scss";

const LoadingScreen = (props) => {
  return (
    <div className="loading-screen-cls">
      <div className="loading-elems-cls">
        <img src={clamIcon} />
        <p>{props.text || "Loading..."}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
