import React from "react";
import clamIcon from "assets/clam-icon.png";
import "./index.scss";

const LoadingScreen = (props) => {
  const isProgressShown = props.progress !== undefined;
  return (
    <div className="loading-screen-cls">
      <div className="loading-elems-cls">
        <img src={clamIcon} />
        <p>{props.text || "Loading..."}</p>
        {isProgressShown && (
          <div className="p-6 space-y-2">
            <progress
              className="progress progress-info bg-white"
              value={props.progress}
              max="100"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
