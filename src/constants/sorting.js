export const SORT_ORDER_CLAMS_KEY = "sortOrderClams";
export const SORT_ORDER_PEARLS_KEY = "sortOrderPearls";

export const SORT_ORDER_CLAMS_KEYS = {
  saferoom: "saferoomSortOrderClams",
  farmDepositingModal: "farmDepositingModalSortOrderClams",
  farm: "farmSortOrderClams",
  shop: "shopSortOrderClams",
};
export const SORT_ORDER_PEARLS_KEYS = {
  saferoom: "saferoomSortOrderPearls",
  bank: "bankSortOrderPearls",
};

export const SORT_ORDERS = {
  asc: "asc",
  desc: "desc",
  none: "none",
};

export const SORT_ORDERS_SEQUENCE_MAP = {
  [SORT_ORDERS.asc]: SORT_ORDERS.desc,
  [SORT_ORDERS.desc]: SORT_ORDERS.none,
  [SORT_ORDERS.none]: SORT_ORDERS.asc,
};

export const SORT_CLAMS_OPTIONS = {
  id: "id",
  rarity: "rarity",
  pearls: "pearls",
  shape: "shape",
  colour: "colour",
  shell: "shell",
  pearlTime: "pearlTime",
};

export const SORT_PEARLS_OPTIONS = {
  id: "id",
  rarity: "rarity",
  shape: "shape",
  grading: "grading",
  colour: "colour",
  boost: "boost",
  maxYieldIn: "maxYieldIn",
};

export const CLAMS_SORT_BUTTONS = [
  {
    value: SORT_CLAMS_OPTIONS.id,
    displayValue: "ID#",
  },
  {
    value: SORT_CLAMS_OPTIONS.rarity,
    displayValue: "Rarity Tier",
  },
  {
    value: SORT_CLAMS_OPTIONS.pearls,
    displayValue: "Pearls Remaining",
  },
  {
    value: SORT_CLAMS_OPTIONS.shape,
    displayValue: "Shape",
  },
  {
    value: SORT_CLAMS_OPTIONS.colour,
    displayValue: "Shell Colour",
  },
  {
    value: SORT_CLAMS_OPTIONS.shell,
    displayValue: "Claimable $SHELL",
  },
];

export const FARM_CLAMS_SORT_BUTTONS = [
  ...CLAMS_SORT_BUTTONS,
  {
    value: SORT_CLAMS_OPTIONS.pearlTime,
    displayValue: "Time Till Pearl",
  },
];

export const PEARLS_SORT_BUTTONS = [
  {
    value: SORT_PEARLS_OPTIONS.id,
    displayValue: "ID#",
  },
  {
    value: SORT_PEARLS_OPTIONS.rarity,
    displayValue: "Rarity Tier",
  },
  {
    value: SORT_PEARLS_OPTIONS.shape,
    displayValue: "Shape",
  },
  {
    value: SORT_PEARLS_OPTIONS.colour,
    displayValue: "Body colour",
  },
  {
    value: SORT_PEARLS_OPTIONS.grading,
    displayValue: "Grading",
  },
  {
    value: SORT_PEARLS_OPTIONS.boost,
    displayValue: "GEM Boost",
  },
  {
    value: SORT_PEARLS_OPTIONS.maxYieldIn,
    displayValue: "Max Yield In",
  },
];
