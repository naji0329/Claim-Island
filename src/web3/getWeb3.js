import Web3 from 'web3'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  if (window.web3 && typeof window.web3 !== 'object') {
    return window.web3
  }
  let web3
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
  }
  window.web3 = web3
  return window.web3
}