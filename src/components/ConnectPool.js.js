import React, { useState, useEffect } from "react";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { Button } from "reactstrap";
import buyShellPresale from "../web3/buyShellPresale.js";
import { accountShellBalance, addTokenToMetamask } from "../web3/bep20";
import { shellTokenAddress } from "../web3/constants";
import { formatBN } from "../utils/number";
import { utils } from "web3";
const BN = utils.BN;

const flexEnd = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "1rem",
};

const buttonColor = {
  backgroundColor: "#38DCDC",
};

const ConnectPool = (props) => {
  const { account, connect, reset } = useWallet();
  const { onPresentConnectModal } = useWalletModal(connect, reset);
  const [shellBalance, setShellBalance] = useState(new BN(0));

  // Update User's SHELL balance
  useEffect(() => {
    let isCancelled = false;

    if (account) {
      async function updateUserShellBal() {
        const shellBal = await accountShellBalance(account);
        if (!isCancelled) {
          setShellBalance(shellBal);
        }
      }

      updateUserShellBal();
      const id = setInterval(updateUserShellBal, 15000);

      // eslint-disable-next-line consistent-return
      return () => {
        isCancelled = true;
        clearInterval(id);
      };
    }
  }, [account]);

  const purchaseShell = async (account) => {
    const hardCodedAmount = utils.toWei("1", "finney");
    try {
      await buyShellPresale({ account, amount: hardCodedAmount });
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <div style={flexEnd}>
      {!account && (
        <Button onClick={onPresentConnectModal} {...props} style={buttonColor}>
          Connect
        </Button>
      )}
      {account && (
        <>
          <div style={buttonColor} >$SHELL: {formatBN(shellBalance, 2)}</div>
          <Button onClick={() => purchaseShell(account)} style={buttonColor}>
            Buy Shell
          </Button>
          <Button onClick={() => addTokenToMetamask({ tokenAddress: shellTokenAddress, tokenSymbol: 'SHELL', tokenDecimals: 18, tokenImage: 'https://clamisland.fi/favicon/favicon.ico' })} style={buttonColor}>
            Add Shell to Metamask
          </Button>
        </>
      )}
    </div>
  );
};

export default ConnectPool;
