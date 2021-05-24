import React, { useState, useEffect } from "react";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge, Form, FormGroup, Label, Input } from "reactstrap";

import buyShellPresale, { getPresaleRate, individualLimitUsed } from "../web3/buyShellPresale.js";
import { accountShellBalance, addTokenToMetamask } from "../web3/bep20";
import { shellTokenAddress } from "../web3/constants";
import { web3 } from "../web3";
import { formatBN } from "../utils/number";
import { utils } from "web3";

import { toast } from 'react-toastify';

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
  const { account, connect, reset, status } = useWallet();
  const { onPresentConnectModal } = useWalletModal(connect, reset);
  const [shellBalance, setShellBalance] = useState(new BN(0));
  const [presaleRate, setPresaleRate] = useState(new BN(5));
  const [individualLimit, setIndividualLimit] = useState(new BN(0));
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [filled, setFilled] = useState(false);

  const [connectedAccount, setConAccount] = useState('');

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // detect if account is connected
  web3.eth.getAccounts().then((acc) => {
    setConAccount(acc[0] || '');
  });

  useEffect(() => {
      if(+props.progress === 400) {
        setFilled(true);
      }
  }, [props.progress]);

  // set account when connected from usewallet provider
  useEffect(() => {
      if(status === 'connected') {
        setConAccount(account);
      }
  }, [status])

  // Update SHELL presale info
  useEffect(() => {
    let isCancelled = false;

    if (connectedAccount) {
      async function updateUserShellPresaleData() {
        const shellBal = await accountShellBalance(connectedAccount);
        const formatedBalance = utils.fromWei(shellBal, 'ether')
        const saleRate = await getPresaleRate();
        const indLimitValue = await individualLimitUsed(connectedAccount);
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
  }, [connectedAccount]);

  // console.log({ purchaseAmount, shellBalance, individualLimit })

  const purchaseShell = async (connectedAccount) => {
    if (purchaseAmount === '' || purchaseAmount === '0' || purchaseAmount === null || purchaseAmount === 0) {
      return;
    }

    props.triggerSpeech('buy');

    const bnbAmount = utils.toWei(purchaseAmount, "ether");
    try {
      await buyShellPresale({ connectedAccount, amount: bnbAmount }, props.callback, props.errCallback);
    } catch (e) {
      props.callback('sale_failure');
      console.log(`Error: ${e.message}`, typeof e.message);
      const formatError = e.message.split('"message": "')[1].split('",')[0]
      toast(formatError, {autoClose: 8000})
    }
  };
  const disableButton = (Number(purchaseAmount) + Number(individualLimit)) > INDIVIDUAL_CAP || INDIVIDUAL_CAP === Number(individualLimit)

  const render = () => {
    return props.showConnect ? (
      <div style={flexEnd}>
        {!connectedAccount && (
          <Button onClick={() => { props.triggerSpeech('connect'); onPresentConnectModal(); }} style={buttonColor}>
            Connect Wallet
          </Button>
        )}
        {connectedAccount && (
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

            {!filled ?
              <>
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
                        placeholder="enter BNB amount"
                      />
                      {purchaseAmount > 0 && purchaseAmount <= 3 && (
                        <p>You will receive {Number(purchaseAmount) * Number(presaleRate.toString())} in SHELL</p>
                      )}
                      {(Number(purchaseAmount) + Number(individualLimit)) > INDIVIDUAL_CAP && (
                        <p>Individual Limit of 3BNB has been applied</p>
                      )}
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="success"
                    onClick={() => purchaseShell(connectedAccount)}
                    style={{opacity: (disableButton ? 0.5 : 1)}}
                    disabled={disableButton}>
                    Buy
                  </Button>
                  {INDIVIDUAL_CAP === Number(individualLimit) && <p>You reached your quota</p>}
                  <Button color="danger" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              </> : <Button color="danger">Presale Filled</Button>}
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
