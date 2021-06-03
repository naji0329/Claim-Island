import React, { useState, useEffect } from "react";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from "reactstrap";

import { buyClamPresale, getClamPrice } from "../web3/buyClamPresale.js";
import { accountClamBalance } from "../web3/clam";
import { web3 } from "../web3";
import { utils } from "web3";

import { toast } from "react-toastify";

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

const ConnectPoolClam = (props) => {
  const { account, connect, reset, status } = useWallet();
  const { onPresentConnectModal } = useWalletModal(connect, reset);
  const [clamBalance, setClamBalance] = useState(new BN(0));
  const [presalePrice, setPresalePrice] = useState(new BN(5));
  const [filled, setFilled] = useState(false);

  const [connectedAccount, setConnectedAccount] = useState("");

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (+props.progress === 100) {
      setFilled(true);
    }
  }, [props.progress]);

  // set account when connected from usewallet provider
  useEffect(() => {
    if (status === "connected") {
      setConnectedAccount(account);
    }

    const detectAccountConnection = async function () {
      if (web3 && web3.eth) {
        // detect if account is connected
        const accounts = await web3.eth.getAccounts();
        const acc = accounts[0];
        setConnectedAccount(acc);
      }
    };
    detectAccountConnection();
  }, [status]);

  // Update CLAM presale info
  useEffect(() => {
    let isCancelled = false;

    if (connectedAccount) {
      async function updateUserClamPresaleData() {
        const clamBal = await accountClamBalance(connectedAccount);
        const salePrice = await getClamPrice();

        if (!isCancelled) {
          setClamBalance(clamBal);
          setPresalePrice(salePrice);
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

  const purchaseClam = async (connectedAccount) => {
    props.triggerSpeech("buy");

    try {
      await buyClamPresale({ account: connectedAccount }, props.callback, props.errCallback);
    } catch (e) {
      props.callback("sale_failure");
      console.log(`Error: ${e.message}`, typeof e.message);
      const formatError = !!e.message.split('"message": "')[1] ? e.message.split('"message": "')[1].split('",')[0] : e.message;
      toast(formatError, { autoClose: 8000 });
    }
  };

  const INDIVIDUAL_CAP = 1;
  const disableButton = clamBalance > INDIVIDUAL_CAP;

  const render = () => {
    return props.showConnect ? (
      <div style={flexEnd}>
        {!connectedAccount && (
          <Button
            onClick={() => {
              props.triggerSpeech("connect");
              onPresentConnectModal();
            }}
            style={buttonColor}
          >
            Connect Wallet
          </Button>
        )}
        {connectedAccount && (
          <>
            <Button style={buttonColor} pill={true.toString()}>
              { clamBalance && `You have ${clamBalance} Clam ${clamBalance > 1 ? 's' : '' }`}
            </Button>

            {!filled ? (
              <>
                <Button color="success" onClick={toggle}>
                  Buy Clam
                </Button>
                <Modal isOpen={modal} centered={true} size="md" className="clam-modal">
                  <ModalHeader style={{ justifyContent: "center" }}>
                    GET Clams
                    <div>
                      <Badge color="dark" pill={true}>
                        Current Clam Price: {utils.fromWei(presalePrice, "ether")} BNB
                      </Badge>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    <Button
                      color="primary"
                      onClick={() => purchaseClam(connectedAccount)}
                      style={{
                        opacity: disableButton ? 0.5 : 1,
                        borderRadius: "20px",
                        height: "52px",
                        backgroundColor: "#0072E3",
                        width: "293px",
                        marginLeft: "calc(50% - 146px)",
                      }}
                      disabled={disableButton}
                    >
                      Buy Clam
                    </Button>
                  </ModalBody>
                  <ModalFooter style={{ justifyContent: "center" }}>
                    {disableButton && <p>You haave already bought your Clam</p>}
                    <Button color="danger" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </>
            ) : (
              <Button color="danger">Presale Filled</Button>
            )}
          </>
        )}
      </div>
    ) : (
      <div></div>
    );
  };

  return <>{render()}</>;
};

export default ConnectPoolClam;
