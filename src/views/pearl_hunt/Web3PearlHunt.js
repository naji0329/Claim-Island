import React from "react";
import { useAsync } from "react-use";
import { connect } from "redux-zero/react";

import "./index.scss";

import pearlHuntContract from "web3/pearlHunt";

import { store, actions } from "store/redux";

const Web3PearlHunt = ({ updatePearlHunt }) => {
  const fetchPearlHuntData = async () => {
    try {
      const {
        account: { isBSChain, address },
      } = store.getState();

      if (isBSChain) {
        const [accountPearlCount, lastWinner] = await Promise.all([
          pearlHuntContract.accountPearlCount(address),
          pearlHuntContract.lastWinner(address),
        ]);

        updatePearlHunt({
          accountPearlCount,
          lastWinner,
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  useAsync(async () => {
    await fetchPearlHuntData();
  });
  return <div></div>;
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Web3PearlHunt);
