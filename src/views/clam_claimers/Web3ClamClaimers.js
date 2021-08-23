import React from "react";
import { useAsync } from "react-use";
import { connect } from "redux-zero/react";

import "./index.scss";

import clamClaimersContract from "../../web3/clamClaimers";
import { getRNGFromHashRequest } from "../../web3/rng";

import { store, actions } from "../../store/redux";

const Web3ClamClaimers = ({ updateClamClaimers, account, clamClaimerData: { progress } }) => {
  const fetchPresaleData = async () => {
    try {
      console.log("fetchPresaleData");
      const {
        account: { isBSChain, address },
        clamClaimerData,
      } = store.getState();

      if (isBSChain) {
        console.log("fetch presale data", {
          isBSChain,
          address,
          clamClaimerData,
        });
        const [isClamClaimer, individualCap, clamsClaimed, usersClaimedClam, hashRequest] =
          await Promise.all([
            clamClaimersContract.isClamClaimer(address),
            clamClaimersContract.individualCap(),
            clamClaimersContract.clamsClaimed(),
            clamClaimersContract.usersClaimedClam(address),
            clamClaimersContract.rngRequestHashFromBuyersClam(address),
          ]);

        let rng;
        if (hashRequest) {
          rng = await getRNGFromHashRequest(hashRequest);
        }

        console.log("updateClamClaimers", {
          isClamClaimer,
          individualCap,
          rng,
          usersClaimedClam,
          clamsClaimed,
        });

        const cap = 264; // 66 * 4 clams needs to be claimed from earlier purchasers
        console.log("update", { isClamClaimer });
        updateClamClaimers({
          individualCap,
          isClamClaimer, // current minted tokens
          usersClaimedClam,
          progress: Math.floor((Number(clamsClaimed) / cap) * 100),
          clamsClaimed,
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
  return (
    <div className="shadow w-full bg-green-100">
      <div className="bg-green-600 leading-none py-1 text-center text-white uppercase text-sm rounded">
        {progress}% of clams claimed
      </div>
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Web3ClamClaimers);
