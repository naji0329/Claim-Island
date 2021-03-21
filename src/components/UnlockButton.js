import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const UnlockButton = (props) => {
  const { connect, reset } = useWallet()
  // const blockNumber = wallet.getBlockNumber();
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <Button onClick={onPresentConnectModal} {...props} style={{backgroundColor: "#38DCDC"}}>
      Connect
    </Button>
  )
};

export default UnlockButton;
