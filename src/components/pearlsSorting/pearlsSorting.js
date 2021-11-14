import React, { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useAction } from "redux-zero/react";

import { actions } from "store/redux";
import { SortingBar } from "components/sortingBar";
import {
  SORT_ORDER_PEARLS_KEY,
  PEARLS_SORT_BUTTONS,
  SORT_ORDERS_SEQUENCE_MAP,
  SORT_ORDERS,
} from "constants/sorting";

const { sortPearls: sortPearlsAC } = actions();

export const PearlsSorting = () => {
  const [sortOrderPearls = {}, setSortOrderPearls] = useLocalStorage(SORT_ORDER_PEARLS_KEY);
  const { value, order } = sortOrderPearls;
  const sortPearls = useAction(sortPearlsAC);

  useEffect(() => {
    if (value && order) {
      sortPearls(value, order);
    }
  }, [sortOrderPearls]);

  const onSortOrderClick = () => {
    if (order) {
      setSortOrderPearls({
        value,
        order: SORT_ORDERS_SEQUENCE_MAP[order],
      });
    }
  };

  const onSortValueClick = (value) => {
    setSortOrderPearls({ value, order: "asc" });
  };

  return (
    <SortingBar
      selected={SORT_ORDERS.none !== order && value}
      order={order}
      sortButtons={PEARLS_SORT_BUTTONS}
      onSortValueClick={onSortValueClick}
      onSortOrderClick={onSortOrderClick}
    />
  );
};
