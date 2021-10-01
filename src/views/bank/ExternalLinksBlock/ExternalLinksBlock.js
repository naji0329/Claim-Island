import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export const ExternalLinksBlock = ({ totalTVL }) => (
  <div className="flex">
    <div className="mr-2 btn btn-secondary drop-shadow-button btn-unclickable">
      Total TVL {totalTVL}
    </div>
    <a
      className="mr-2 btn btn-secondary drop-shadow-button"
      href="https://pancakeswap.finance/swap?outputCurrency=0x01c16da6E041Cf203959624Ade1F39652973D0EB"
      target="_blank"
      rel="noopener noreferrer"
    >
      Exchange $SHELL&nbsp;
      <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
    </a>
    <a
      className="btn btn-secondary drop-shadow-button"
      href="https://pancakeswap.finance/swap?outputCurrency=0x9fb4DEF63f8caEC83Cb3EBcC22Ba0795258C988a"
      target="_blank"
      rel="noopener noreferrer"
    >
      Exchange $GEM&nbsp;
      <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
    </a>
  </div>
);
