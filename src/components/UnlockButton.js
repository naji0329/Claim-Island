import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const UnlockButton = (props) => {
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      Unlock Wallet
    </Button>
  )
}

export default UnlockButton
