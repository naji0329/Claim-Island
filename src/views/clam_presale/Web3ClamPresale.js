import React, { useState, useEffect } from "react";
import { useAsync } from "react-use";
import { Progress } from "reactstrap";
import { formatUnits } from "@ethersproject/units";

import "./index.scss";
import {
  presaleCap,
  hasSaleStarted as getHasSaleStarted,
  getClamPrice,
} from "../../web3/buyClamPresale";

import { totalClamSupply } from "../../web3/clam";
import { PresaleStore } from "../../store/presale";
import { AccountStore } from "../../store/account";

const Web3ClamPresale = () => {
  const isBSChain = AccountStore.useState((obj) => obj.isBSChain);

  // presale props
  const [statePresale, setStatePresale] = useState({
    cap: "0",
    totalSupply: "0",
    progress: 0,
    salePrice: "0",
    isStarted: true, //false,
  });

  const fetchPresaleData = async () => {
    console.log("fetch presale data", { isBSChain });

    // if (isBSChain) {
    const [hasSaleStarted, cap, totalSupply, salePrice] = await Promise.all([
      getHasSaleStarted(),
      presaleCap(),
      totalClamSupply(),
      getClamPrice(),
    ]);

    setStatePresale({
      cap, // max will be minted tokens
      totalSupply, // current minted tokens
      salePrice: formatUnits(salePrice, 18),
      progress: (Number(totalSupply) / cap) * 100,
      isStarted: hasSaleStarted,
    });
    // }
  };

  useAsync(async () => {
    // init call
    await fetchPresaleData();

    setInterval(async () => {
      // update every 10s
      await fetchPresaleData();
    }, 10000); //10s
  });

  useEffect(() => {
    PresaleStore.update((obj) => ({ ...obj, ...statePresale }));
  }, [statePresale]);

  return (
    <>
      {console.log({ statePresale })}
      <Progress striped color="success" value={statePresale.progress}>
        {statePresale.progress}% of Clams Purchased
      </Progress>
    </>
  );
};

export default Web3ClamPresale;
