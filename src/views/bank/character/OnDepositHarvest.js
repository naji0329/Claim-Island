export const onDepositHarvestTxn = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.process_transaction.text",
    button: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
}; 

export const onDepositHarvestSuccess = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.transaction_success.text",
    button: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
}; 

export const onDepositHarvestError = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.transaction_error.text",
    button: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
}; 

export const onDepositFeeAlert = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.deposit_fee_alert.text",
    button: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
}; 

export const onWithdrawPearlRewardsAlert = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.withdraw_pearl_rewards_alert.text",
    button: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
}; 

export const onPearlBoostYieldAlert = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.pearl_boost_yield_alert.text",
    button: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
}; 