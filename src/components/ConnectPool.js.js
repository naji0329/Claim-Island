import React from "react";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { Button } from "reactstrap";
import buyShellPresale from '../web3/buyShellPresale.js'
import { utils } from 'web3'

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
  const { onPresentConnectModal } = useWalletModal(connect, reset);

  const purchaseShell = async (account) => {
    const hardCodedAmount = utils.toWei('1', 'finney')
    try {
      await buyShellPresale({ account,  amount: hardCodedAmount })
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }


  return (
    <div style={flexEnd}>
      <Button onClick={onPresentConnectModal} {...props} style={buttonColor}>
        Connect
      </Button>
      { account &&
        <Button onClick={() => purchaseShell(account)} style={buttonColor}>
          Buy Shell
        </Button>
      }
    </div>
  );
};

export default ConnectPool;
