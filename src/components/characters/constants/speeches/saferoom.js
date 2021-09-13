export const SAFEROOM_SPEECH = {
	saferoom: {
		connect: {
			text: `Excellent! First, let's get your wallet connected. You will need to do this in order to see your Clams. Press the "Connect Wallet" button in the top right of the screen.`,
			next: `purchase`,
			dismiss: false,
			skip: false,
		},

		connected: {
			text: `Excellent, please follow the prompts above to purchase a Clam.`,
			next: `processing`,
			dismiss: false,
			skip: false,
		},

		processing: {
			text: `Hold on while we process your transaction...`,
			next: `congrats`,
			dismiss: false,
			skip: false,
		},

		congrats: {
			text: `Thank you for your purchase! Let me just go fetch your Clam. I'll just be a minute.`,
			next: "collection",
			dismiss: true,
			skip: false,
		},

		collection: {
			text: `You Clam is ready for collection!`,
			next: false,
			dismiss: true,
			skip: false,
		},

		collectionProcessing: {
			text: `One moment, just let me just unbox this Clam for you. Did you know that no one knows what Clam is inside until you collect it, not even me?`,
			next: false,
			dismiss: true,
			skip: false,
		},

		congratsCollection: {
			text: `Congratulations, here's your Clam! You may go to the Saferoom to see your Clam.`,
			next: false,
			dismiss: true,
			skip: false,
		},

		error: {
			text: `I'm sorry, something went wrong. Please try again.`,
			next: false,
			dismiss: false,
			skip: false,
		},

		cancel: {
			text: `Ok, let me know if you change your mind and want to buy some $CLAM.`,
			next: "purchase",
			dismiss: false,
			skip: false,
		},
	}
};

export const SAFEROOM_BUTTONS = {
  saferoom: {}
};
