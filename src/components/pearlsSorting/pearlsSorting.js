import React, { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useAction, useSelector } from "redux-zero/react";

import { actions } from "store/redux";
import { SortingBar } from "components/sortingBar";
import {
  PEARLS_SORT_BUTTONS,
  SORT_ORDERS_SEQUENCE_MAP,
  SORT_ORDERS,
  SORT_ORDER_PEARLS_KEYS,
} from "constants/sorting";
import { sortingOrderSelectors } from "selectors/sorting";

const { updateSortOrder: updateSortOrderAC } = actions();

export const PearlsSorting = ({ page, textSize }) => {
  const [sortOrderPearlsLS, setSortOrderPearlsLS] = useLocalStorage(SORT_ORDER_PEARLS_KEYS[page]);
  const updateSortOrder = useAction(updateSortOrderAC);
  const sortOrderPearls = useSelector(sortingOrderSelectors[page].pearls);
  const { order, value } = sortOrderPearls;

  useEffect(() => {
    if (sortOrderPearlsLS) {
      updateSortOrder(sortOrderPearlsLS, page, "pearls");
    }
  }, []);

  useEffect(() => {
    if (order && value) {
      setSortOrderPearlsLS({ order, value });
    }
  }, [order, value]);

  const onSortOrderClick = () => {
    if (order) {
      const newSortingOrder = {
        value,
        order: SORT_ORDERS_SEQUENCE_MAP[order],
      };
      updateSortOrder(newSortingOrder, page, "pearls");
    }
  };

  const onSortValueClick = (sortValue) => {
    const newSortingOrder = {
      value: sortValue,
      order: SORT_ORDERS.asc,
    };
    updateSortOrder(newSortingOrder, page, "pearls");
  };

  return (
    <SortingBar
      selected={SORT_ORDERS.none !== order && value}
      order={order}
      sortButtons={PEARLS_SORT_BUTTONS}
      onSortValueClick={onSortValueClick}
      onSortOrderClick={onSortOrderClick}
      textSize={textSize}
    />
  );
};
