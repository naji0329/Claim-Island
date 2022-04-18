import classNames from "classnames";
import React, { useContext } from "react";

import { AccordionContext } from "./accordionContext";

export const Accordion2Item = ({ scroll, id, title, children }) => {
  const { tab, toggle, isOpened } = useContext(AccordionContext);

  return (
    <>
      <div className="div_lg">
        <li className="bg-white mb-2" key={id}>
          <h2
            className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer rounded-xl border border-gray-400"
            onClick={() => {
              toggle(id);
            }}
          >
            <span className="text-black">{title}</span>
            <svg
              className={classNames(
                "fill-current text-blue-700 h-6 w-6 transform transition-transform duration-500",
                { "rotate-180": isOpened || id === tab }
              )}
              viewBox="0 0 20 20"
            >
              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          </h2>

          <div
            style={{
              overflow: scroll ? "" : "hidden",
              overflowY: scroll ? "auto" : "hidden",
              transition: "all 0.5s ease-out",
              maxHeight: isOpened || id === tab ? "225px" : "0",
            }}
          >
            <div className="p-0 text-gray-900 overflow-auto">{children}</div>
          </div>
        </li>
      </div>
      <div className="div_sm">
        <li className="bg-white mb-2" key={id}>
          <h2
            className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer border border-gray-400"
            onClick={() => {
              toggle(id);
            }}
          >
            <span className="text-black">{title}</span>
            <svg
              className={classNames(
                "fill-current text-blue-700 h-6 w-6 transform transition-transform duration-500",
                { "rotate-180": isOpened || id === tab }
              )}
              viewBox="0 0 20 20"
            >
              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          </h2>

          <div
            style={{
              overflow: scroll ? "" : "hidden",
              overflowY: scroll ? "auto" : "hidden",
              transition: "all 0.5s ease-out",
              maxHeight: isOpened || id === tab ? "" : "0",
            }}
          >
            <div className="p-0 text-gray-900 overflow-auto">{children}</div>
          </div>
        </li>
      </div>
    </>
  );
};
