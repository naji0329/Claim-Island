import React from "react";

const Card = ({ children }) => {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-auto bg-white shadow-md rounded-xl overflow-hidden mx-auto pointer-events-auto max-h-160">
          <div className="px-3 py-2 mt-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Card;
