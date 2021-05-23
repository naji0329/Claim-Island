import React from 'react'
import { useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button } from 'reactstrap';

const ConnectPool = (props) => {
  const { account, connect, reset } = useWallet()
  // const blockNumber = wallet.getBlockNumber();
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <Button onClick={onPresentConnectModal} {...props} style={{backgroundColor: "#38DCDC"}}>
      Connect
    </Button>
  )
};

export default ConnectPool;
