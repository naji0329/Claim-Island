import React, { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useAction, useSelector } from "redux-zero/react";

import { actions } from "store/redux";
import { SortingBar } from "components/sortingBar";
import {
  SORT_ORDER_CLAMS_KEYS,
  CLAMS_SORT_BUTTONS,
  SORT_ORDERS_SEQUENCE_MAP,
  SORT_ORDERS,
  FARM_CLAMS_SORT_BUTTONS,
} from "constants/sorting";
import { sortingOrderSelectors } from "selectors/sorting";

const { updateSortOrder: updateSortOrderAC } = actions();

export const ClamsSorting = ({ page, textSize }) => {
  const [sortOrderClamsLS, setSortOrderClamsLS] = useLocalStorage(SORT_ORDER_CLAMS_KEYS[page]);
  const updateSortOrder = useAction(updateSortOrderAC);
  const sortOrderClams = useSelector(sortingOrderSelectors[page].clams);
  const { order, value } = sortOrderClams;

  useEffect(() => {
    if (sortOrderClamsLS) {
      updateSortOrder(sortOrderClamsLS, page, "clams");
    }
  }, []);

  useEffect(() => {
    if (order && value) {
      setSortOrderClamsLS({ order, value });
    }
  }, [order, value]);

  const onSortOrderClick = () => {
    if (order) {
      const newSortingOrder = {
        value,
        order: SORT_ORDERS_SEQUENCE_MAP[order],
      };
      updateSortOrder(newSortingOrder, page, "clams");
    }
  };

  const onSortValueClick = (sortValue) => {
    const newSortingOrder = {
      value: sortValue,
      order: SORT_ORDERS.asc,
    };
    updateSortOrder(newSortingOrder, page, "clams");
  };

  return (
    <SortingBar
      selected={SORT_ORDERS.none !== order && value}
      order={order}
      sortButtons={page === "farm" ? FARM_CLAMS_SORT_BUTTONS : CLAMS_SORT_BUTTONS}
      onSortValueClick={onSortValueClick}
      onSortOrderClick={onSortOrderClick}
      textSize={textSize}
    />
  );
};
