import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";
import { connect } from "redux-zero/devtools";

const initialState = {
  account: {
    bnbBalance: "0",
    clamBalance: "0",
    error: undefined,
    isConnected: undefined,
    isBSChain: true,
    address: undefined,
  },
  presale: {
    cap: "0",
    clamsPurchased: "0",
    progress: undefined,
    salePrice: "0",
    isStarted: undefined,
    isEnded: false,
    usersPurchasedClam: "0",
    rng: undefined, // from call rngRequestHashFromBuyersClam
    hashRequest: undefined,
  },
  clamClaimerData: {
    individualCap: "0",
    isClamClaimer: undefined,
    usersClaimedClam: "0",
    progress: undefined,
    clamsClaimed:"0",
    rng: undefined, // from call rngRequestHashFromBuyersClam
    hashRequest: undefined,
  },
  character: {
    name: undefined,
    action: undefined,
    button: {
      text: undefined,
      alt: undefined,
    },
    buttonAlt: {
      text: undefined,
      alt: undefined,
    },
  },
  konvaObjects: [],
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
  updateClamClaimers: (state, value) => {
    return {
      clamClaimerData: {
        ...state.clamClaimerData,
        ...value,
      },
    };
  },
  updateCharacter: (state, value) => {
    value.buttonAlt = value.buttonAlt ? value.buttonAlt : {};
    const obj = {
      character: {
        ...state.character,
        ...value,
      },
    };
    return obj;
  },
  addKonvaObject: (state, value) => {
    return {
      konvaObjects: [...state.konvaObjects, value],
    }
  },
  destroyKonvaObjects: (state) => {
    state.konvaObjects.forEach((obj) => { obj.destroy(); });
      return {
        konvaObjects: [],
      };
  }
});

export default { store, actions };
