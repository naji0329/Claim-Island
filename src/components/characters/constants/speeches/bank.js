export const BANK_SPEECH = {
  bank: {
    connect: {
      text: "Welcome to Clam Island Bank! You’ll need to connect your wallet using the button on the top right of your screen in order to invest with us.",
      next: false,
      dismiss: true,
      skip: false,
    },
    connect_no_wallet: {
      text: "Welcome to Clam Island Bank! It looks like you don’t have a blockchain wallet installed. You will need one in order to invest with us.",
      next: false,
      dismiss: true,
      skip: false,
    },
    connect_wrong_chain: {
      text: "Welcome to Clam Island Bank! In order to invest with us, you will need to switch your wallet to Binance Smart Chain.",
      next: false,
      dismiss: true,
      skip: false,
    },
    welcome: {
      text: "Welcome back to Clam Island Bank! Please let me know if you need help with anything.",
      next: false,
      dismiss: true,
      skip: true,
      hideable: true,
    },
    welcome_back: {
      text: "Hello again! Can I help you with anything?",
      next: false,
      dismiss: true,
      skip: true,
      hideable: true,
    },
    acknowledge_no_help_needed: {
      text: "No problem, happy investing! Just talk to me if you do need any help.",
      next: false,
      dismiss: true,
      skip: true,
      hideable: true,
    },
    help_needed: {
      text: "We are currently working on an explainer video, in the meantime please refer to our Visitor’s Guide. In the future the video will be part of the Visitor’s Information Centre.",
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },
    process_transaction: {
      text: "Please wait while we process your transaction. Please note, your wallet may ask you to approve two transactions one after the other - please approve both transactions if that occurs.",
      next: false,
      dismiss: true,
      skip: false,
    },
    transaction_error: {
      text: "We’re sorry, something went wrong and your transaction could not be processed. Funds have not been removed. Please try again later.",
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },
    transaction_success: {
      text: "Congratulations, your transaction was successful!",
      next: false,
      dismiss: true,
      skip: true,
      hideable: true,
    },
    deposit_fee_alert: {
      text: "Please note, this pool has a deposit fee, which is deducted on deposit and not refundable. Do you want to proceed?",
      next: false,
      dismiss: true,
      skip: false,
    },
    withdraw_pearl_rewards_alert: {
      text: "You still have pending Pearl reward boosts available. Withdrawing now will cause your boosted rewards to be reduced proportionally. Are you sure you want to withdraw?",
      next: false,
      dismiss: true,
      skip: false,
    },
    pearl_boost_yield_alert: {
      text: "This will destroy your Pearl in return for the investment boost, and is irreversible. Do you want to continue?",
      next: false,
      dismiss: true,
      skip: false,
    },
    burn_pearl_confirmation: {
      text: "This will forfeit your Pearl. This is irreversible and you will not be able to get your Pearl back. Are you sure you want to continue?",
      next: false,
      dismiss: true,
      skip: false,
    },
    burn_pearl_without_max_gem_yield_confirmation: {
      text: ({ timer }) =>
        `This Pearl is not available for max GEM Yield for another ${timer}. Exchanging it now will mean that you can only receive 50% of its max GEM Yield. Are you sure you want to proceed?`,
      next: false,
      dismiss: true,
      skip: false,
    },
    forfeit_pearl: {
      text: ({ fullReward }) =>
        `This will exchange your Pearl in return for ${fullReward} GEM Yield. You can choose to receive your full GEM Yield streamed linearly over 30 days, or you can forfeit half in order to receive your GEM Yield now. How do you want to proceed?`,
      next: false,
      dismiss: true,
      skip: false,
    },
    burn_pearl_success: {
      text: ({ forfeit }) =>
        `All done! Your Pearl has been forfeited and your $GEM boost ${
          forfeit ? "has been transferred" : "is now streaming"
        }.`,
      next: false,
      dismiss: true,
      skip: false,
    },
    stream_burn_pearl_success: {
      text: ({ fullReward }) =>
        `Your pearl has been exchanged successfully for a stream of ${fullReward} GEM over 30 days. Any streamed amount will be automatically collected when you harvest from any investment pool. You can check the vesting breakdown to see any remaining amount to be streamed.`,
      next: false,
      dismiss: true,
      skip: false,
    },
    instant_burn_pearl_success: {
      text: ({ halfReward }) =>
        `Your pearl has been exchanged successfully for ${halfReward} GEM! The amount should be available in your wallet.`,
      next: false,
      dismiss: true,
      skip: false,
    },
  },
};

export const BANK_BUTTONS = {
  bank: {
    transaction_error: {
      next: "OK",
      alt: false,
    },
    deposit_fee_alert: {
      next: "OK",
      alt: false,
    },
    withdraw_pearl_rewards_alert: {
      next: "OK",
      alt: false,
    },
    pearl_boost_yield_alert: {
      next: "OK",
      alt: false,
    },
  },
};
