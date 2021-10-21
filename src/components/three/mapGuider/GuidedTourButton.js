import React from "react";

import tourIcon from "assets/tour-icon.svg";

export const GuidedTourButton = ({ setIsGuidedTourPassed }) => {
  const handleClick = () => setIsGuidedTourPassed(false);

  return (
    <div className="fixed left-10 bottom-5">
      <div data-tip="Guided Tour" className="tooltip mb-4 left-12">
        <button className="btn-lg" onClick={handleClick}>
          <img className="h-full" src={tourIcon} />
        </button>
      </div>
    </div>
  );
};
