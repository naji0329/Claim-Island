import React from "react";
import { useAsync } from "react-use";
import { connect } from "redux-zero/react";

import "./index.scss";

import communityRewardsContract from "../../web3/communityRewards";
import { getRNGFromHashRequest } from "../../web3/rng";

import { store, actions } from "../../store/redux";

const Web3CommunityRewards = ({ updateCommunityRewards }) => {
  const fetchPresaleData = async () => {
    try {
      const {
        account: { isBSChain, address },
        communityRewardsData,
      } = store.getState();

      if (isBSChain) {
        console.log("fetch data", {
          isBSChain,
          address,
          communityRewardsData,
        });
        const [isAwardee, userRewards, hashRequest] = await Promise.all([
          communityRewardsContract.isAwardee(address),
          communityRewardsContract.userRewards(address),
          communityRewardsContract.rngRequestHashFromRewardBeneficiary(address),
        ]);

        let rng;
        if (hashRequest) {
          rng = await getRNGFromHashRequest(hashRequest);
        }

        updateCommunityRewards({
          isAwardee,
          userRewards,
          hashRequest,
          rng,
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  useAsync(async () => {
    setInterval(async () => {
      await fetchPresaleData();
    }, 2500); // 2.5s
  });
  return <div></div>;
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Web3CommunityRewards);
