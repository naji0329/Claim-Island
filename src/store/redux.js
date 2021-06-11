import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";
import { connect } from "redux-zero/devtools";

const initialState = {
  account: {
    bnbBalance: "0",
    clamBalance: "0",
    error: undefined,
    isConnected: undefined,
    isBSChain: undefined,
    address: undefined,
  },
  presale: {
    cap: "0",
    totalSupply: "0",
    progress: undefined,
    salePrice: "0",
    isStarted: false,
    hasPurchasedClam: false,
    rng: undefined, // from call rngRequestHashFromBuyersClam
  },
};

const middlewares = connect ? applyMiddleware(connect(initialState)) : [];
export const store = createStore(initialState, middlewares);

export const actions = (store) => ({
  updateAccount: (state, value) => {
    return {
      account: {
        ...state.account,
        ...value,
      },
    };
  },
  updatePresale: (state, value) => {
    return {
      presale: {
        ...state.presale,
        ...value,
      },
    };
  },
});

export default { store, actions };
