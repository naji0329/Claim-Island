import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const ICONS_MAP = {
  asc: faCaretUp,
  desc: faCaretDown,
  default: faSort,
};

export const SortingBar = (props) => {
  const { sortButtons, selected, order, onSortValueClick, onSortOrderClick, textSize } = props;

  if (!sortButtons) {
    return null;
  }

  const size = !textSize ? "2xl" : textSize;

  const selectedFilterName = sortButtons.find((button) => button.value === selected)?.displayValue;

  const sortButtonComponents = sortButtons.map(({ value, displayValue }) => (
    <li
      className={classNames({
        "btn-active cursor-not-allowed": value === selected,
        "hover:bg-indigo-900": value !== selected,
      })}
      key={value}
    >
      <button
        className={classNames("btn btn-sm btn-ghost", { "cursor-not-allowed": value === selected })}
        disabled={value === selected}
        onClick={() => onSortValueClick(value)}
      >
        <span className="mr-1 text-white">{displayValue}</span>
      </button>
    </li>
  ));

  return (
    <div className="dropdown dropdown-hover text-white h-full cursor-pointer min-w-180">
      <div
        tabIndex="0"
        className={`flex flex-none bg-gray-900 bg-opacity-90 p-4 rounded-xl text-${size}`}
      >
        <button
          data-tip="Сhange the sorting order"
          className="tooltip mr-2 px-3 hover:bg-indigo-900 rounded"
          onClick={onSortOrderClick}
        >
          <FontAwesomeIcon icon={ICONS_MAP[order] || ICONS_MAP.default} />
        </button>
        Sort by: {selectedFilterName || "N/A"}
      </div>
      <ul
        tabIndex="0"
        className="menu w-full dropdown-content rounded-xl bg-gray-900 bg-opacity-90"
      >
        {sortButtonComponents}
      </ul>
    </div>
  );
};
