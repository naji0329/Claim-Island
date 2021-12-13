import React from "react";
import { useAsync } from "react-use";
import { connect } from "redux-zero/react";

import "./index.scss";

import { rngRequestHash } from "../../web3/clamExchange";
import { getRNGFromHashRequest } from "../../web3/rng";

import { store, actions } from "../../store/redux";

const Web3CommunityRewards = (props) => {
  const { updateClamSwap } = props;

  const fetchPresaleData = async () => {
    try {
      const {
        account: { isBSChain },
      } = store.getState();

      if (isBSChain) {
        const hashRequest = await rngRequestHash();

        let rng;
        if (hashRequest) {
          rng = await getRNGFromHashRequest(hashRequest);
        }

        updateClamSwap({
          rng,
          hashRequest,
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  useAsync(async () => {
    setInterval(async () => {
      await fetchPresaleData();
    }, 2500); // 2.5s // TODO: uncomment
  });
  return <div></div>;
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Web3CommunityRewards);
