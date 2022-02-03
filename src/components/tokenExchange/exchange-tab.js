import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export const Exchange = () => (
  <div className="w-full h-full flex flex-col items-center p-5">
    <div className="mx-2 text-3xl font-aristotelica-bold text-center mt-24">
      Integrated Exchange
      <br />
      Coming Soon!
    </div>
    <div className="flex flex-col items-center mt-24">
      <a
        className="btn btn-secondary drop-shadow-button w-[200px]"
        href="https://app.bogged.finance/swap?tokenIn=BNB&tokenOut=0x9fb4DEF63f8caEC83Cb3EBcC22Ba0795258C988a"
        target="_blank"
        rel="noopener noreferrer"
      >
        Exchange $GEM&nbsp;
        <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
      </a>
      <a
        className="btn btn-secondary drop-shadow-button mt-4 w-[200px]"
        href="https://app.bogged.finance/swap?tokenIn=BNB&tokenOut=0x01c16da6E041Cf203959624Ade1F39652973D0EB"
        target="_blank"
        rel="noopener noreferrer"
      >
        Exchange $SHELL&nbsp;
        <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
      </a>
    </div>
  </div>
);
