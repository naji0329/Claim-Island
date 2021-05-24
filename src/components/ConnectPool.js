import React, { useState, useEffect } from "react";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge, Form, FormGroup, Label, Input } from "reactstrap";

import buyShellPresale, { getPresaleRate, individualLimitUsed } from "../web3/buyShellPresale.js";
import { accountShellBalance, addTokenToMetamask } from "../web3/bep20";
import { shellTokenAddress } from "../web3/constants";
import { formatBN } from "../utils/number";
import { utils } from "web3";
const BN = utils.BN;

const flexEnd = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "1rem",
  zIndex: 999,
  position: "relative",
};

const buttonColor = {
  backgroundColor: "#38DCDC",
};

const INDIVIDUAL_CAP = 3;

const ConnectPool = (props) => {
  const { account, connect, reset } = useWallet();
  const { onPresentConnectModal } = useWalletModal(connect, reset);
  const [shellBalance, setShellBalance] = useState(new BN(0));
  const [presaleRate, setPresaleRate] = useState(new BN(5));
  const [individualLimit, setIndividualLimit] = useState(new BN(0));
  const [purchaseAmount, setPurchaseAmount] = useState(0);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Update SHELL presale info
  useEffect(() => {
    let isCancelled = false;

    if (account) {
      async function updateUserShellPresaleData() {
        const shellBal = await accountShellBalance(account);
        const formatedBalance = utils.fromWei(shellBal, 'ether')
        const saleRate = await getPresaleRate();
        const indLimitValue = await individualLimitUsed(account);
        const formatedIndividualLimit = utils.fromWei(indLimitValue, 'ether')

        if (!isCancelled) {
          setShellBalance(formatedBalance);
          setPresaleRate(saleRate);
          setIndividualLimit(formatedIndividualLimit);
        }
      }

      updateUserShellPresaleData();
      const id = setInterval(updateUserShellPresaleData, 15000);

      // eslint-disable-next-line consistent-return
      return () => {
        isCancelled = true;
        clearInterval(id);
      };
    }
  }, [account]);

  console.log({ purchaseAmount, shellBalance, individualLimit })

  const purchaseShell = async (account) => {
    if (purchaseAmount === '' || purchaseAmount === '0' || purchaseAmount === null || purchaseAmount === 0) {
      return;
    }

    props.triggerSpeech('buy');

    const bnbAmount = utils.toWei(purchaseAmount, "ether");
    try {
      await buyShellPresale({ account, amount: bnbAmount }, props.callback, props.errCallback);
    } catch (e) {
      props.callback('sale_failure');
      props.errCallback(e.message);
      console.log(`Error: ${e}`);
    }
  };

  const render = () => {
    return props.showConnect ? (
      <div style={flexEnd}>
        {!account && (
          <Button onClick={() => { props.triggerSpeech('connect'); onPresentConnectModal(); }} style={buttonColor}>
            Connect Wallet
          </Button>
        )}
        {account && (
          <>
            <Button style={buttonColor} pill={true}>
              $SHELL Balance: {formatBN(shellBalance, 2)}
            </Button>
            <Button
              onClick={() =>
                addTokenToMetamask({
                  tokenAddress: shellTokenAddress,
                  tokenSymbol: "SHELL",
                  tokenDecimals: 18,
                  tokenImage: "https://clamisland.fi/favicon/favicon.ico",
                })
              }
              style={buttonColor}
            >
              Add Shell to Metamask
            </Button>

            <Button color="success" onClick={toggle}>
              Buy Shell
            </Button>
            <Modal isOpen={modal} centered={true} size="lg" toggle={toggle} className="shell-modal">
              <ModalHeader toggle={toggle}>
                GET $SHELL
                <div>
                  <Badge color="dark" pill={true}>
                    $SHELL Balance: {formatBN(shellBalance, 2)}
                  </Badge>
                  <Badge color="dark" pill={true}>
                    You can use up to {(INDIVIDUAL_CAP - Number(individualLimit)).toFixed(2)} BNB to purchase $SHELL
                  </Badge>
                </div>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="shell">Enter BNB Amount</Label>
                    <Input
                      type="text"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(e.target.value)}
                      name="buy-shell"
                      placeholder="enter Amount of BNB"
                    />
                    {purchaseAmount > 0 && (
                      <p>You will receive {Number(purchaseAmount) * Number(presaleRate.toString())} in SHELL</p>
                    )}
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={() => purchaseShell(account)}>
                  Buy
                </Button>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </>
        )}
      </div>
    ): <div></div>;
  };

  return (
    <>{render()}</>
  );
};

export default ConnectPool;
