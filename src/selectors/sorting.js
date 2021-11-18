import { get } from "lodash";

const selectSaferoomClamsSorting = (state) => get(state, ["sorting", "saferoom", "clams"], {});

const selectSaferoomPearlsSorting = (state) => get(state, ["sorting", "saferoom", "pearls"], {});

const selectFarmDepositingModalSorting = (state) =>
  get(state, ["sorting", "farmDepositingModal", "clams"], {});

const selectFarmSorting = (state) => get(state, ["sorting", "farm", "clams"], {});

export const sortingOrderSelectors = {
  saferoom: {
    clams: selectSaferoomClamsSorting,
    pearls: selectSaferoomPearlsSorting,
  },
  farmDepositingModal: {
    clams: selectFarmDepositingModalSorting,
  },
  farm: {
    clams: selectFarmSorting,
  },
};
