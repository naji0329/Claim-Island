import { truncate } from "lodash";
import { WelcomeUserBack } from "./WelcomeUserBack";
import NetworkService from "../../../utils/NetworkService";

const ifWeb3NotInstalled = ({ updateCharacter, isWeb3Installed }) => {
  updateCharacter({
    name: "tanja",
    action: !isWeb3Installed ? "bank.connect_no_wallet.text" : "bank.connect_wrong_chain.text",
    button: {
      text: "Tell me how",
      alt: {
        action: "cb",
        destination: async () => {
          if (isWeb3Installed) {
            await NetworkService.createOrSwitchNetwork();
          } else {
            window.open(
              "https://medium.com/stakingbits/setting-up-metamask-for-binance-smart-chain-bsc-921d9a2625fd",
              "_blank"
            );
          }
        },
      },
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

const ifWalletNotConnected = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.connect.text",
    button: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
};

const assistantAck = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.welcome.text",
    button: {
      text: "Ok",
      dismiss: truncate,
      alt: {
        action: "cb",
        dismiss: true,
        destination: () => {
          window.localStorage.setItem("bankAssistantAcknowledged", true);
          setTimeout(() => {
            const surpressSpeechBubble = true;
            WelcomeUserBack({ surpressSpeechBubble, updateCharacter });
          }, 1000);
        },
      },
    },
  });
};

export const WalletConnectAndAssist = ({
  isWeb3Installed,
  isBSChain,
  isConnected,
  assistantAcknowledged,
  updateCharacter,
}) => {
  if (!isWeb3Installed || !isBSChain) {
    ifWeb3NotInstalled({ updateCharacter, isWeb3Installed });
  } else if (!isConnected) {
    ifWalletNotConnected(updateCharacter);
  } else if (!assistantAcknowledged) {
    assistantAck(updateCharacter);
  } else {
    WelcomeUserBack({ updateCharacter });
  }
};
