import React, { useState, useEffect } from "react";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge, Form, FormGroup, Label, Input } from "reactstrap";

import buyClamPresale, { getClamPrice, presaleCap } from "../web3/buyClamPresale.js";
import { accountClamBalance, addTokenToMetamask } from "../web3/bep20";
import { clamNFTAddress } from "../web3/constants";
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

const ConnectPoolClam = (props) => {
  const { account, connect, reset, status } = useWallet();
  const { onPresentConnectModal } = useWalletModal(connect, reset);
  const [clamBalance, setClamBalance] = useState(new BN(0));
  const [presaleRate, setPresaleRate] = useState(new BN(5));
  const [individualLimit, setIndividualLimit] = useState(new BN(0));
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [filled, setFilled] = useState(false);

  const [connectedAccount, setConAccount] = useState('');

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  if(web3 && web3.eth) {
    // detect if account is connected
    web3.eth.getAccounts().then((acc) => {
      setConAccount(acc[0] || '');
    });
  }


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

  // Update CLAM presale info
  useEffect(() => {
    let isCancelled = false;

    if (connectedAccount) {
      async function updateUserClamPresaleData() {
        const clamBal = await accountClamBalance(connectedAccount);
        const formatedBalance = utils.fromWei(clamBal, 'ether')
        const saleRate = await getClamPrice();
        const indLimitValue = await presaleCap(connectedAccount);
        const formatedIndividualLimit = utils.fromWei(indLimitValue, 'ether')

        if (!isCancelled) {
          setClamBalance(formatedBalance);
          setPresaleRate(saleRate);
          setIndividualLimit(formatedIndividualLimit);
        }
      }

      updateUserClamPresaleData();
      const id = setInterval(updateUserClamPresaleData, 15000);

      // eslint-disable-next-line consistent-return
      return () => {
        isCancelled = true;
        clearInterval(id);
      };
    }
  }, [connectedAccount]);

  // console.log({ purchaseAmount, clamBalance, individualLimit })

  const purchaseClam = async (connectedAccount) => {
    if (purchaseAmount === '' || purchaseAmount === '0' || purchaseAmount === null || purchaseAmount === 0) {
      return;
    }

    props.triggerSpeech('buy');

    const bnbAmount = utils.toWei(purchaseAmount, "ether");
    try {
      await buyClamPresale({ connectedAccount, amount: bnbAmount }, props.callback, props.errCallback);
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
              $CLAM Balance: {formatBN(clamBalance, 2)}
            </Button>
            <Button
              onClick={() =>
                addTokenToMetamask({
                  tokenAddress: clamNFTAddress,
                  tokenSymbol: "Clam",
                  tokenDecimals: 18,
                  tokenImage: "https://clamisland.fi/favicon/favicon.ico",
                })
              }
              style={buttonColor}
            >
              Add Clam to Metamask
            </Button>

            {!filled ?
              <>
              <Button color="success" onClick={toggle}>
                Buy Clam
              </Button>
              <Modal isOpen={modal} centered={true} size="md" className="clam-modal">
                <ModalHeader style={{justifyContent: 'center'}}>
                  GET Clams on BSC
                  <div>
                    <Badge color="dark" pill={true}>
                      $CLAM Balance: {formatBN(clamBalance, 2)}
                    </Badge>
                    {/* <Badge color="dark" pill={true}>
                      You can use up to {(INDIVIDUAL_CAP - Number(individualLimit)).toFixed(2)} BNB to purchase $CLAM
                    </Badge> */}
                  </div>
                </ModalHeader>
                <ModalBody>
                  <Button
                    color="primary"
                    onClick={() => purchaseClam(connectedAccount)}
                    style={{
                      opacity: (disableButton ? 0.5 : 1),
                      borderRadius: '20px',
                      height: '52px',
                      backgroundColor: '#0072E3',
                      width: '293px',
                      marginLeft: 'calc(50% - 146px)'
                    }}
                    disabled={disableButton}>
                    Buy Clam
                  </Button>
                </ModalBody>
                <ModalFooter style={{justifyContent: 'center'}}>
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

export default ConnectPoolClam;
