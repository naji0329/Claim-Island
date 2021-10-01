import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export const ExternalLinksBlock = () => (
  <div className="flex">
    <a
      className="p-2 mr-2 rounded-xl shadown-xl bg-blue-500 text-white hover:bg-blue-300 font-semibold"
      href="https://pancakeswap.finance/swap?outputCurrency=0x01c16da6E041Cf203959624Ade1F39652973D0EB"
      target="_blank"
      rel="noopener noreferrer"
    >
      Exchange $SHELL&nbsp;
      <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
    </a>
    <a
      className="p-2 rounded-xl shadown-xl bg-blue-500 text-white hover:bg-blue-300 font-semibold"
      href="https://pancakeswap.finance/swap?outputCurrency=0x9fb4DEF63f8caEC83Cb3EBcC22Ba0795258C988a"
      target="_blank"
      rel="noopener noreferrer"
    >
      Exchange $GEM&nbsp;
      <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
    </a>
  </div>
);
