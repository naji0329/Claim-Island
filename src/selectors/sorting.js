import { get } from "lodash";

export const selectSaferoomClamsSorting = (state) =>
  get(state, ["sorting", "saferoom", "clams"], {});

export const selectSaferoomPearlsSorting = (state) =>
  get(state, ["sorting", "saferoom", "pearls"], {});

export const sortingOrderSelectors = {
  saferoom: {
    clams: selectSaferoomClamsSorting,
    pearls: selectSaferoomPearlsSorting,
  },
};
