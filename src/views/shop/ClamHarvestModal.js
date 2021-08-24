import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { formatUnits } from "@ethersproject/units";
import { Link } from "react-router-dom";

import {
  getClamByIndex,
  getClamData,
  getClamValueInShellToken,
  harvestClamForShell,
} from "../../web3/clam";
import { getDNADecoded } from "../../web3/dnaDecoder";

import "./index.scss";

import Card from "../../components/Card";

import ClamPic from "../../assets/collect-clam.png";
import { actions } from "../../store/redux";
import { truncate, get } from "lodash";

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
        <div>Lifespan: {get(dnaDecoded, "lifespan")}h</div>
        <Link to="/saferoom" className="block">
          View in Saferoom V{" "}
        </Link>

        <div className="underline cursor-pointer" onClick={() => harvestClam(tokenId)}>
          Harvest
        </div>
      </div>
    </div>
  );
};

const getUserClamDnaByIndex = async (account, index) => {
  const tokenId = await getClamByIndex(account, index);
  const { dna } = await getClamData(tokenId);

  if (dna.length > 1) {
    const dnaDecoded = await getDNADecoded(dna);
    return { dna, dnaDecoded, tokenId };
  }
};

const ClamHarvestModal = ({
  setModalToShow,
  account: { address, clamBalance },
  updateCharacter,
  updateAccount,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clams, setClams] = useState([]);
  const [clamValueInShellToken, setClamValueInShellToken] = useState("");

  const harvestClam = async (tokenId) => {
    updateCharacter({
      name: "diego",
      action: "clam_shop.harvest_warn.text",
      button: {
        text: "MoreInformation",
        alt: {
          action: "cb",
          destination: () => {
            window.open(
              "https://clamisland.medium.com/clam-island-essential-visitors-guide-63f2a9984336",
              "_blank"
            );
          },
        },
      },
      buttonAlt: {
        text: "Proceed",
        alt: {
          action: "cb",
          destination: async () => {
            try {
              await harvestClamForShell(tokenId, address);
              updateCharacter({
                name: "diego",
                action: "clam_shop.harvest_congrats.text",
                button: {
                  text: "Ok",
                  dismiss: truncate,
                },
              });
              setModalToShow(null);
            } catch (e) {
              console.error(e);
              setIsLoading(false);
              updateAccount({ error: e.message });
              updateCharacter({
                name: "diego",
                action: "clam_presale.error.text",
                button: {
                  text: undefined,
                },
              });
            }
          },
        },
      },
    });
  };

  useEffect(async () => {
    if (+clamBalance > 0) {
      let promises = [];
      for (let index = 0; index < Number(clamBalance); index++) {
        promises.push(getUserClamDnaByIndex(address, index));
      }
      const clams = await Promise.all(promises);
      setClams(clams.filter(({ dnaDecoded }) => get(dnaDecoded, "lifespan") !== "0"));
    }
    setClamValueInShellToken(await getClamValueInShellToken());
  }, [address, clamBalance]);

  return (
    <Card className="p-2">
      <h1 className="flex justify-center font-bold">Choose a Clam</h1>
      <div className="bg-white flex-1 justify-center  md:flex items-center flex-col overflow-scroll">
        {clams.length &&
          clams.map((clam, i) => (
            <ClamItem
              clam={clam}
              key={i}
              harvestClam={harvestClam}
              clamValueInShellToken={clamValueInShellToken}
            />
          ))}
      </div>
    </Card>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamHarvestModal);
