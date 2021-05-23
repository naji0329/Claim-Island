import React from "react";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { Button } from "reactstrap";

const flexEnd = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "1rem"
};

const buttonColor = {
  backgroundColor: "#38DCDC",
}

const ConnectPool = (props) => {
  const { account, connect, reset } = useWallet();
  console.log({ account });
  // const blockNumber = wallet.getBlockNumber();
  const { onPresentConnectModal } = useWalletModal(connect, reset);

  return (
    <div style={flexEnd}>
      <Button onClick={onPresentConnectModal} {...props} style={buttonColor}>
        Connect
      </Button>
    </div>
  );
};

export default ConnectPool;
