import { truncate } from "lodash";
import { WelcomeUserBack } from "./WelcomeUserBack";

export const onDepositHarvestTxn = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.process_transaction.text",
    button: false,
  });
};

export const onDepositHarvestSuccess = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.transaction_success.text",
    button: {
      text: "OK",
      dismiss: true,
    },
  });
};

export const onDepositHarvestError = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.transaction_error.text",
    button: {
      text: "OK",
      dismiss: true,
    },
    buttonAlt: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
};

export const onDepositFeeAlert = (updateCharacter, cb) => {
  updateCharacter({
    name: "tanja",
    action: "bank.deposit_fee_alert.text",
    button: {
      text: "Yes",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
    buttonAlt: {
      text: "No",
      alt: {
        action: "cb",
        destination: () => WelcomeUserBack({ updateCharacter, suppressSpeechBubble: true }),
      },
    },
  });
};

export const onWithdrawPearlRewardsAlert = (updateCharacter, cb) => {
  updateCharacter({
    name: "tanja",
    action: "bank.withdraw_pearl_rewards_alert.text",
    button: {
      text: "Yes, I understand",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
    buttonAlt: {
      text: "No",
      alt: {
        action: "cb",
        destination: () => WelcomeUserBack({ updateCharacter, suppressSpeechBubble: true }),
      },
    },
  });
};

export const onPearlBoostYieldAlert = (updateCharacter, cb) => {
  updateCharacter({
    name: "tanja",
    action: "bank.pearl_boost_yield_alert.text",
    button: {
      text: "Yes",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
    buttonAlt: {
      text: "No",
      dismiss: truncate,
    },
  });
};
