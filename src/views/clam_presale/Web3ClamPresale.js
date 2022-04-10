import React from "react";
import { useAsync } from "react-use";
import { formatUnits } from "@ethersproject/units";
import { connect } from "redux-zero/react";

import "./index.scss";

import presaleContract from "../../web3/buyClamPresale";
import { getRNGFromHashRequest } from "../../web3/rng";
// import clamContract from "../../web3/clam";

import { store, actions } from "../../store/redux";

const Web3ClamPresale = ({ updatePresale, account, presale: { progress, isStarted } }) => {
  const fetchPresaleData = async () => {
    try {
      const {
        account: { isBSChain, address },
        presale,
      } = store.getState();

      // if has purchase then hasRequest is not empty then no need to keep pulling data
      if (isBSChain && presale.hashRequest === undefined) {
        console.log("fetch presale data", { isBSChain, address, presale });
        const [
          hasSaleStarted,
          hasSaleEnded,
          cap,
          clamsPurchased,
          salePrice,
          usersPurchasedClam,
          hashRequest,
        ] = await Promise.all([
          presaleContract.hasSaleStarted(),
          presaleContract.hasSaleEnded(),
          presaleContract.presaleCap(),
          presaleContract.clamsPurchased(),
          presaleContract.getClamPrice(),
          presaleContract.usersPurchasedClam(address),
          presaleContract.rngRequestHashFromBuyersClam(address),
        ]);

        let rng;
        if (hashRequest) {
          rng = await getRNGFromHashRequest(hashRequest);
        }

        console.log("updatePresale", { usersPurchasedClam, hashRequest, rng, clamsPurchased });

        updatePresale({
          cap, // max will be minted tokens
          clamsPurchased, // current minted tokens
          salePrice: formatUnits(salePrice, 18),
          progress: Math.floor((Number(clamsPurchased) / cap) * 100),
          isStarted: hasSaleStarted,
          isEnded: hasSaleEnded,
          usersPurchasedClam,
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
    <>
      {isStarted && (
        <div className="shadow w-full bg-green-100">
          <div
            className="bg-green-600 leading-none py-1 text-center text-white uppercase text-sm rounded"
            style={{ width: `${progress}%` }}
          >
            {progress}% of Clams Purchased
          </div>
        </div>
      )}
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Web3ClamPresale);
