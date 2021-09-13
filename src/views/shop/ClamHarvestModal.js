import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { formatUnits } from "@ethersproject/units";
import { Link } from "react-router-dom";

import {
  getClamByIndex,
  getClamData,
  getClamValueInShellToken,
  harvestClamForShell,
  getClamIncubationTime,
} from "../../web3/clam";

import { getCurrentBlockTimestamp } from "../../web3";

import { getDNADecoded } from "../../web3/dnaDecoder";

import "./index.scss";

import Card from "../../components/Card";

import ClamPic from "../../assets/collect-clam.png";
import { actions } from "../../store/redux";
import { get } from "lodash";

import {
  harvestClamSpeak,
  harvestCongrats,
  harvestError,
  harvestChooseClams,
  harvestNoClamsAvailable,
} from "./character/HarvestClam";

const formatShell = (value) => (value ? formatUnits(value, 18) : "0");

const ClamItem = ({ clam, clamValueInShellToken, harvestClam }) => {
  const { dnaDecoded, tokenId } = clam;
  return (
    <div className="bg-white flex-1 justify-center  md:flex items-center p-4">
      <div className="mr-4">
        <img src={ClamPic} width="50" />
        <div>{get(dnaDecoded, "rarity")}</div>
      </div>
      <div className="w-full">
        <div>$SHELL value: {formatShell(clamValueInShellToken)}</div>
        <div>Lifespan: {get(dnaDecoded, "lifespan")} pearls</div>
        <div>
          <Link to="/saferoom/clam" className="block">
            View in Saferoom{" "}
          </Link>
        </div>

        <div className="underline cursor-pointer" onClick={() => harvestClam(tokenId)}>
          Harvest
        </div>
      </div>
    </div>
  );
};

const getUserClamDnaByIndex = async (account, index) => {
  const tokenId = await getClamByIndex(account, index);
  const { dna, birthTime } = await getClamData(tokenId);

  if (dna.length > 1) {
    const dnaDecoded = await getDNADecoded(dna);
    return { dna, dnaDecoded, tokenId, birthTime };
  }
};

const formatDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  return [`${hours}h`, `${minutes}m`, `${seconds}s`].filter((item) => item[0] !== "0").join(" ");
};

const ClamHarvestModal = ({
  setModalToShow,
  account: { address, clamBalance },
  updateCharacter,
  updateAccount,
}) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [clams, setClams] = useState([]);
  const [message, setMessage] = useState("Loading...");
  const [clamValueInShellToken, setClamValueInShellToken] = useState("");

  const harvestClam = async (tokenId) => {
    // character speaks
    harvestClamSpeak({ updateCharacter }, async () => {
      try {
        await harvestClamForShell(tokenId, address);
        harvestCongrats({ updateCharacter, setModalToShow }); // character speaks
        setModalToShow(null);
      } catch (e) {
        console.error(e);
        // setIsLoading(false);
        updateAccount({ error: e.message });
        harvestError({ updateCharacter }); // character speaks
      }
    });
  };

  useEffect(async () => {
    const incubationtime = await getClamIncubationTime();

    if (+clamBalance > 0) {
      let promises = [];
      for (let index = 0; index < Number(clamBalance); index++) {
        promises.push(getUserClamDnaByIndex(address, index));
      }
      const clams = await Promise.all(promises);

      const currentBlockTimestamp = await getCurrentBlockTimestamp();

      const filteredClams = clams.filter(
        ({ dnaDecoded, birthTime }) =>
          get(dnaDecoded, "lifespan") !== "0" &&
          currentBlockTimestamp > +birthTime + +incubationtime
      );

      if (filteredClams.length > 0) {
        setMessage(`Choose a Clam`);
        harvestChooseClams({ updateCharacter, setModalToShow }); // character speaks
      } else {
        const hours = formatDuration(+incubationtime);
        setMessage(
          `None of your clams are able to be harvested.
           They must be either alive or be past the ${hours} incubation period once they have been farmed.`
        );
        harvestNoClamsAvailable({ updateCharacter, setModalToShow, hours }); // character speaks
      }
      setClams(filteredClams);
    } else {
      // clam balance is zero
      const hours = formatDuration(+incubationtime);
      harvestNoClamsAvailable({ updateCharacter, setModalToShow, hours }); // character speaks
    }

    setClamValueInShellToken(await getClamValueInShellToken());
  }, [address, clamBalance]);

  return (
    <>
      {clams.length ? (
        <Card className="p-2">
          <h1 className="flex justify-center font-bold">{message}</h1>
          <div className="bg-white flex-1 justify-center  md:flex items-center flex-col overflow-scroll">
            {clams.map((clam, i) => (
              <ClamItem
                clam={clam}
                key={i}
                harvestClam={harvestClam}
                clamValueInShellToken={clamValueInShellToken}
              />
            ))}
          </div>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamHarvestModal);
