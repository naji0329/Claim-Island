import React, { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useAction } from "redux-zero/react";

import { actions } from "store/redux";
import { SortingBar } from "components/sortingBar";
import {
  SORT_ORDER_CLAMS_KEY,
  CLAMS_SORT_BUTTONS,
  SORT_ORDERS_SEQUENCE_MAP,
} from "constants/sorting";

const { sortCalms: sortCalmsAC } = actions();

export const ClamsSorting = () => {
  const [sortOrderClams = {}, setSortOrderClams] = useLocalStorage(SORT_ORDER_CLAMS_KEY);
  const { value, order } = sortOrderClams;
  const sortClams = useAction(sortCalmsAC);

  useEffect(() => {
    if (value && order) {
      sortClams(value, order);
    }
  }, [sortOrderClams]);

  const onSortOrderClick = () => {
    if (order) {
      setSortOrderClams({
        value,
        order: SORT_ORDERS_SEQUENCE_MAP[order],
      });
    }
  };

  const onSortValueClick = (value) => {
    setSortOrderClams({ value, order: "asc" });
  };

  return (
    <SortingBar
      selected={value}
      order={order}
      sortButtons={CLAMS_SORT_BUTTONS}
      onSortValueClick={onSortValueClick}
      onSortOrderClick={onSortOrderClick}
    />
  );
};
