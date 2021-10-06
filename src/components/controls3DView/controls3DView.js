import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Controls3DView = ({ onClickPrev, onClickNext }) => (
  <>
    {onClickPrev && (
      <button className="absolute top-1/2 left-1/10" onClick={onClickPrev}>
        <FontAwesomeIcon className="text-white w-12 h-12" size="3x" icon={faChevronLeft} />
      </button>
    )}
    {onClickNext && (
      <button className="absolute top-1/2 right-1/10" onClick={onClickNext}>
        <FontAwesomeIcon className="text-white" size="3x" icon={faChevronRight} />
      </button>
    )}
  </>
);
