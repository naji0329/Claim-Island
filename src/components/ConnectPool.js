import React, { useState, useEffect } from "react";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Badge,
  Form, FormGroup, Label, Input
} from 'reactstrap';

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
  zIndex: 999,
  position: "relative"
};

const buttonColor = {
  backgroundColor: "#38DCDC",
};

const ConnectPool = (props) => {
  const { account, connect, reset } = useWallet();
  const { onPresentConnectModal } = useWalletModal(connect, reset);
  const [shellBalance, setShellBalance] = useState(new BN(0));
  const [shellAmount, setShellAmount] = useState(0);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDwn = () => setDropdownOpen(prevState => !prevState);

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
    console.log(shellAmount)
    const hardCodedAmount = utils.toWei(shellAmount, "finney");
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
          Connect Wallet
        </Button>
      )}
      {account && (
        <>
          <Button  style={buttonColor} pill>$SHELL Balance: {formatBN(shellBalance, 2)}</Button>
          <Button onClick={() => addTokenToMetamask({ tokenAddress: shellTokenAddress, tokenSymbol: 'SHELL', tokenDecimals: 18, tokenImage: 'https://clamisland.fi/favicon/favicon.ico' })} style={buttonColor}>
            Add Shell to Metamask
          </Button>

          <Button color="success" onClick={toggle}>Buy Shell</Button>
          <Modal isOpen={modal} centered={true} size="lg" toggle={toggle} className="shell-modal">
            <ModalHeader toggle={toggle}>
              GET $SHELL
              <div>
                <Badge color="dark" pill>$SHELL Balance: {formatBN(shellBalance, 2)}</Badge>
              </div>
            </ModalHeader>
            <ModalBody>

            {/* <Dropdown isOpen={dropdownOpen} toggle={toggleDwn}>
              <DropdownToggle caret>
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem text>Dropdown Item Text</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}

            <Form>
              <FormGroup>
                <Label for="shell">Shell</Label>
                <Input type="text" value={shellAmount} onChange={e => setShellAmount(e.target.value)} name="shell" placeholder="enter amount of shell" />
              </FormGroup>
            </Form>

            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => purchaseShell(account)}>Buy</Button>
              <Button color="danger" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
        </>

      )}
    </div>
  );
};

export default ConnectPool;
