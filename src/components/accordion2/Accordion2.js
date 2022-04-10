import React, { useState, useCallback } from "react";

import { AccordionContext } from "./accordionContext";

export const Accordion2 = ({ defaultTab = null, className = "", isOpened = false, children }) => {
  const [tab, setTab] = useState(defaultTab);

  const toggle = useCallback(
    (expandedTab) => {
      let selectedTab = expandedTab;
      if (expandedTab === tab) {
        selectedTab = null;
      }
      setTab(selectedTab);
    },
    [tab, setTab]
  );

  return (
    <AccordionContext.Provider value={{ tab, toggle, isOpened }}>
      <ul className={`${className} flex flex-col`}>{children}</ul>
    </AccordionContext.Provider>
  );
};
