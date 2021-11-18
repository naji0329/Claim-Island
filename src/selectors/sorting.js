import { get } from "lodash";

const selectSaferoomClamsSorting = (state) => get(state, ["sorting", "saferoom", "clams"], {});

const selectSaferoomPearlsSorting = (state) => get(state, ["sorting", "saferoom", "pearls"], {});

const selectFarmDepositingModalSorting = (state) =>
  get(state, ["sorting", "farmDepositingModal", "clams"], {});

const selectFarmSorting = (state) => get(state, ["sorting", "farm", "clams"], {});
const selectShopSorting = (state) => get(state, ["sorting", "shop", "clams"], {});
const selectBankSorting = (state) => get(state, ["sorting", "bank", "pearls"], {});

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
  shop: {
    clams: selectShopSorting,
  },
  bank: {
    pearls: selectBankSorting,
  },
};
