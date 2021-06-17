import React from "react";
import { useAsync } from "react-use";
import { Progress } from "reactstrap";
import { formatUnits } from "@ethersproject/units";
import { connect } from "redux-zero/react";

import "./index.scss";

import presaleContract from "../../web3/buyClamPresale";
import { getRNGFromHashRequest } from "../../web3/rng";
import clamContract from "../../web3/clam";

import { store, actions } from "../../store/redux";

const Web3ClamPresale = ({ updatePresale, account, presale: { progress } }) => {
  const fetchPresaleData = async () => {
    try {
      const {
        account: { isBSChain, address, clamBalance },
        presale,
      } = store.getState();

      // if has purchase then hasRequest is not empty then no need to keep pulling data
      if (
        isBSChain &&
        clamBalance === "0" &&
        presale.hashRequest === undefined
      ) {
        console.log("fetch presale data", { isBSChain, address, presale });
        const [
          hasSaleStarted,
          cap,
          totalSupply,
          salePrice,
          hasPurchasedClam,
          hashRequest,
        ] = await Promise.all([
          presaleContract.hasSaleStarted(),
          presaleContract.presaleCap(),
          clamContract.totalClamSupply(),
          presaleContract.getClamPrice(),
          presaleContract.hasPurchasedClam(address),
          presaleContract.rngRequestHashFromBuyersClam(address),
        ]);

        let rng;
        if (hashRequest) {
          rng = await getRNGFromHashRequest(hashRequest);
        }

        console.log("updatePresale", { hasPurchasedClam, hashRequest, rng });

        updatePresale({
          cap, // max will be minted tokens
          totalSupply, // current minted tokens
          salePrice: formatUnits(salePrice, 18),
          progress: (Number(totalSupply) / cap) * 100,
          isStarted: hasSaleStarted,
          hasPurchasedClam,
          hashRequest,
          rng,
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  useAsync(async () => {
    // TODO -- add loading

    setInterval(async () => {
      await fetchPresaleData();
    }, 3000); //3s
  });

  return (
    <>
      <Progress striped color="success" value={progress}>
        {progress}% of Clams Purchased
      </Progress>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Web3ClamPresale);
