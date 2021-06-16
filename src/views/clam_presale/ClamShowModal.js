import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAsync } from "react-use";
import { getExplorerAddressLink, ChainId } from "@usedapp/core";
import { connect } from "redux-zero/react";

import "./index.scss";

import Card from "../../components/Card";
import Clams3D from "../../components/three/3DClams/3DClams";

import { clamNFTAddress } from "../../web3/constants";
import clamContract from "../../web3/clam";

import ClamUnknown from "../../assets/img/clam_unknown.png";
import { actions } from "../../store/redux";

const ClamShowModal = ({
  account: { address, clamBalance },
  updateCharacter,
}) => {
  const [clamDna, setClamDna] = useState("");

  useEffect(async () => {
    console.log({ clamBalance });
    // clamBalance > 0 means already collected the clam
    if (clamBalance !== "0" && address) {
      const tokenId = await clamContract.getClamByIndex(address, 0);
      console.log({ tokenId });

      if (tokenId) {
        const clamData = await clamContract.getClamData(tokenId);
        console.log({ clamData });
        if (clamData.dna.length > 1) {
          setClamDna(clamData.dna);

          updateCharacter({
            name: "diego",
            action: "clam_presale.congratsConllection.text",
            button: {
              text: "Dismiss",
            },
          });
        }
      }
    }
  }, [address]);

  return (
    <>
      <Card>
        <div className="flex flex-col my-3">
          <h2 className="text-blue-700 font-semibold text-2xl tracking-wide mb-2">
            You got a Clam!
          </h2>
          <a
            className="text-gray-500 text-base underline"
            href={getExplorerAddressLink(clamNFTAddress, ChainId.BSC)}
            target="_blank"
            rel="noreferrer"
          >
            {clamNFTAddress}
          </a>
        </div>

        <div className="bg-white flex-1 justify-center  md:flex items-center">
          {clamDna && <Clams3D width={"100%"} height={350} clamDna={clamDna} />}
          {!clamDna && <h1>There is no Clam to see :-(</h1>}
        </div>
      </Card>
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamShowModal);
