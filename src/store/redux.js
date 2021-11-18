import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";
import { connect } from "redux-zero/devtools";

// dispatcher imports
import clamContract from "web3/clam";
import {
  gemTokenAddress,
  shellTokenAddress,
  clamNFTAddress,
  pearlNFTAddress,
} from "web3/constants";
import { getStakedClamIds, rngRequestHashForProducedPearl } from "web3/pearlFarm";
import { EmptyBytes, getOwnedClams, getOwnedPearls, formatFromWei } from "web3/shared";
import { balanceOf } from "web3/bep20";

const initialState = {
  account: {
    bnbBalance: "0",
    clamBalance: "0",
    pearlBalance: "0",
    gemBalance: "0",
    shellBalance: "0",
    clamToCollect: null,
    error: undefined,
    isConnected: undefined,
    isBSChain: true,
    chainId: 56,
    isWeb3Installed: true,
    address: undefined,
    clams: [],
    pearls: [],
  },
  price: {
    gem: "0",
    shell: "0",
  },
  ui: {
    isFetching: false,
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
    clamsClaimed: "0",
    rng: undefined, // from call rngRequestHashFromBuyersClam
    hashRequest: undefined,
  },
  communityRewardsData: {
    isAwardee: undefined,
    userRewards: "0",
    rng: undefined, // f  rom call rngRequestHashFromBuyersClam
    hashRequest: undefined,
  },
  pearlHuntData: {
    accountPearlCount: "0",
    lastWinner: undefined,
  },
  character: {
    name: undefined,
    action: undefined,
    variables: {},
    show: undefined, // true or false
    button: {
      text: undefined,
      alt: undefined,
      dismiss: undefined,
    },
    buttonAlt: {
      text: undefined,
      alt: undefined,
      dismiss: undefined,
    },
    suppressSpeechBubble: undefined,
    skipDialogs: false,
    forceTop: false,
  },
  bank: {
    pools: [],
    selectedPool: undefined,
  },
  konvaObjects: [],
  sorting: {
    saferoom: {
      clams: {},
      pearls: {},
    },
    farmDepositingModal: {
      clams: {},
    },
    farm: {
      clams: {},
    },
    shop: {
      clams: {},
    },
  },
};

const middlewares = connect ? applyMiddleware(connect(initialState)) : [];
export const store = createStore(initialState, middlewares);

export const actions = (store) => ({
  updateAccount: (state, value) => {
    const { error } = value;
    const errorObj = {};

    /** If we get error from contract, we need to parse it */
    if (error) {
      try {
        errorObj.error = error.match(/"message":\s?"(.+)"/)[1].replace(/\\n/g, " ");
      } catch {
        errorObj.error = error;
      }
    }
    return {
      account: {
        ...state.account,
        ...value,
        ...errorObj,
      },
    };
  },
  resetAccount: () => {
    return {
      account: { ...initialState.account },
    };
  },
  updatePrice: (state, value) => {
    return {
      price: {
        ...state.price,
        ...value,
      },
    };
  },
  updateUI: (state, value) => {
    return {
      ui: {
        ...state.ui,
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
  updateCommunityRewards: (state, value) => {
    return {
      communityRewardsData: {
        ...state.communityRewardsData,
        ...value,
      },
    };
  },
  updatePearlHunt: (state, value) => {
    return {
      pearlHuntData: {
        ...state.pearlHuntData,
        ...value,
      },
    };
  },
  updateCharacter: (state, value) => {
    if (!("skipDialogs" in value)) {
      value.buttonAlt = value.buttonAlt ? value.buttonAlt : {};
    }
    const obj = {
      character: {
        ...state.character,
        ...value,
        suppressSpeechBubble: value.suppressSpeechBubble || value.skipDialogs,
      },
    };
    return obj;
  },
  suppressSpeechBubbleAction: (state, suppressSpeechBubble) => ({
    character: {
      ...state.character,
      suppressSpeechBubble: suppressSpeechBubble,
    },
  }),
  addKonvaObject: (state, value) => {
    return {
      konvaObjects: [...state.konvaObjects, value],
    };
  },
  destroyKonvaObjects: (state) => {
    state.konvaObjects.forEach((obj) => {
      obj.destroy();
    });
    return {
      konvaObjects: [],
    };
  },
  updateBank: (state, value) => {
    return {
      bank: {
        ...state.bank,
        ...value,
      },
    };
  },

  dispatchFetchAccountAssets: async (state, value) => {
    console.log("dispatchFetchAccountAssets");
    const {
      account: { address, chainId, isBSChain },
    } = state;

    if (isBSChain) {
      // get Clam and Pearsm  in farm
      const stakedClamsInFarm = await getStakedClamIds(address);
      const pearlsReadyInFarm = await Promise.all(
        stakedClamsInFarm.map((clamId) => rngRequestHashForProducedPearl(clamId, address))
      );
      const pearlBalanceInFarm = pearlsReadyInFarm.filter((el) => el !== EmptyBytes).length;
      const clamBalanceInFarm = stakedClamsInFarm.length;

      const [clamBalance, pearlBalance, gemBalance, shellBalance] = await Promise.all([
        balanceOf(clamNFTAddress, address),
        balanceOf(pearlNFTAddress, address),
        balanceOf(gemTokenAddress, address).then((b) => formatFromWei(b)),
        balanceOf(shellTokenAddress, address).then((b) => formatFromWei(b)),
      ]);

      const clams = await getOwnedClams({
        chainId,
        address,
        balance: clamBalance,
        clamContract,
      });

      const pearls = await getOwnedPearls({
        chainId,
        address,
        balance: pearlBalance,
      });

      return {
        account: {
          ...state.account,
          clamBalanceInFarm,
          clamBalance,
          pearlBalanceInFarm,
          pearlBalance,
          gemBalance,
          shellBalance,
          clams,
          pearls,
          reason: "dispatchFetchAccountAssets",
        },
      };
    }
  },
  updateSortOrder: (state, sortOrder = {}, page, entity) => ({
    sorting: {
      ...state.sorting,
      [page]: {
        ...state.sorting[page],
        [entity]: sortOrder,
      },
    },
  }),
});

export default { store, actions };
