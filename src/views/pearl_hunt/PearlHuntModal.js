import React, { useState, useMemo } from "react";
import { ChainId } from "@usedapp/core";
import { connect } from "redux-zero/react";
import "./index.scss";

import Card from "../../components/Card";
import PearlInfo from "./PearlInfo";
import {
  prepTokenOfOwnerByIndexMulticall,
  decodeTokenOfOwnerByIndexFromMulticall,
} from "web3/pearl";
import { getPearlDataByIds } from "web3/shared";
import { aggregate } from "web3/multicall";
import { actions } from "../../store/redux";

import { useAsync } from "react-use";

const PearlHuntModal = ({
  account: { address, pearlBalance },
  updateCharacter,
  updateAccount,
  pearlHuntData: { accountPearlCount },
  chainId,
}) => {
  const [pearls, setPearls] = useState([]);
  const [tgHandle, setTgHandle] = useState("");
  const [eligibleShape, setEligibleShape] = useState("");
  const [eligibleColor, setEligibleColor] = useState("");
  const [secondEligibleColor, setSecondEligibleColor] = useState("");

  useAsync(async () => {
    const chainIdentificaiton = chainId || ChainId.BSC;

    try {
      const tokenIdsCalls = prepTokenOfOwnerByIndexMulticall(address, +pearlBalance);

      const tokenIdsResult = await aggregate(tokenIdsCalls, chainIdentificaiton);
      const tokenIdsDecoded = decodeTokenOfOwnerByIndexFromMulticall(tokenIdsResult.returnData);

      const ownedPearls = await getPearlDataByIds(tokenIdsDecoded, chainIdentificaiton);
      setPearls(ownedPearls);

      setEligibleShape("baroque");
      setEligibleColor("cream");
      setSecondEligibleColor("black");
    } catch (err) {
      console.error(err);
      updateAccount({ error: err.message });
    }
  });

  const eligiblePearls = useMemo(() => {
    const filteredPearls = pearls.filter(
      ({ dnaDecoded }) =>
        dnaDecoded.shape === eligibleShape &&
        (dnaDecoded.color === eligibleColor || dnaDecoded.color === secondEligibleColor)
    );

    if (filteredPearls.length === 0) {
      updateCharacter({
        name: "diego",
        action: "pearl_hunt.not_eligible.text",
        button: {
          text: null,
        },
      });
    } else {
      updateCharacter({
        name: "diego",
        action: "pearl_hunt.add_tg_handle.text",
        button: {
          text: null,
        },
      });
    }

    return filteredPearls;
  }, [pearls, eligibleShape, eligibleColor, secondEligibleColor]);

  const handleTgHandle = (e) => {
    setTgHandle(e.target.value);
  };

  return (
    <>
      <Card>
        <div className="w-full flex flex-col">
          {+accountPearlCount > 0 && (
            <p className="text-3xl font-aristotelica-bold text-gray-500 text-center mb-4">
              You have submitted {accountPearlCount} pearl{accountPearlCount > 1 ? "s" : ""}
            </p>
          )}
          <div className="w-full bg-gray-200 rounded-lg mb-6 p-4 flex justify-between">
            <div className="flex flex-col w-3/5">
              <span className="font-bold">Pearls eligible:</span>
              <div>
                <span className="text-gray-500 inline-block w-16">Shape:</span>
                <span className="text-gray-500">{eligibleShape}</span>
              </div>
              <div>
                <span className="text-gray-500 inline-block w-16">Color:</span>
                <span className="text-gray-500">{eligibleColor} </span>
                <span className="text-gray-500">or {secondEligibleColor}</span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-gray-200 rounded-lg p-2 flex flex-col max-h-160">
              <input
                className="text-2xl"
                placeholder="Enter Telegram Handle"
                type="text"
                step="any"
                value={tgHandle}
                onChange={handleTgHandle}
              />
            </div>
          </div>

          <div className="bg-gray-200 rounded-lg p-4 flex flex-col max-h-160">
            <div className="overflow-y-auto">
              <p className="font-bold mb-4">Pearls</p>
              {eligiblePearls.length ? (
                eligiblePearls.map((pearl, i, a) => (
                  <PearlInfo
                    key={i}
                    pearl={pearl}
                    isEligible
                    isLast={i === a.length - 1}
                    tgHandle={tgHandle}
                  />
                ))
              ) : (
                <p>No pearls available</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(PearlHuntModal);
