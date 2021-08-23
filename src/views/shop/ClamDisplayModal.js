import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";

import "./index.scss";

import Card from "../../components/Card";
import ClamView from "../saferoom/ClamView";

import { clamNFTAddress } from "../../web3/constants";
import clamContract from "../../web3/clam";
import { actions } from "../../store/redux";
import { getDNADecoded } from "../../web3/dnaDecoder";

const ClamDisplayModal = ({
  setModalToShow,
  account: { address, clamToCollect, clamBalance },
  updateCharacter,
}) => {
  const [clamDna, setClamDna] = useState("");
  const [clamDnaDecoded, setClamDnaDecoded] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    if (!clamToCollect && address) {
      try {
        setIsLoading(true);

        const index = Number(clamBalance);
        console.log({ clamBalance, index });
        const tokenId = await clamContract.getClamByIndex(address, index);
        console.log({ tokenId });

        if (tokenId) {
          const clamData = await clamContract.getClamData(tokenId);
          if (clamData.dna.length > 1) {
            setClamDna(clamData.dna);

            const decodedDna = await getDNADecoded(clamData.dna).catch(
              console.log
            );
            console.log({ decodedDna });
            setClamDnaDecoded(decodedDna);

            // updateCharacter({
            //   name: "diego",
            //   action: "clam_presale.congratsCollection.text",
            //   button: {
            //     text: "Go to Saferoom",
            //     alt: {
            //       action: "internal",
            //       destination: "/saferoom",
            //     },
            //   },
            //   buttonAlt: {
            //     text: "Buy more",
            //     alt: {
            //       action: "cb",
            //       destination: () => {
            //         setShowBuyModal(true);
            //         updateCharacter({
            //           name: "diego",
            //           action: "clam_shop.purchase.text",
            //           button: {
            //             text: null,
            //           },
            //         });
            //       },
            //     },
            //   }
            // });
          }
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  }, [address]);

  return (
    <>
      <Card>
        <div
          className="overflow-x-hidden overflow-y-scroll max-h-159"
          style={{ minWidth: "700px" }}
        >
          <div className="bg-white flex-1 justify-center md:flex items-center h-full flex-col w-full">
            {clamDna && clamDnaDecoded && (
              <>
                <ClamView dna={clamData.dna} dnaDecoded={clamDnaDecoded} />

                <div className="flex flex-row my-3">
                  <button
                    className="btn character-btn ml-2"
                    onClick={() => setModalToShow("buy")}
                  >
                    Buy More
                  </button>
                  <button
                    className="btn character-btn ml-2"
                    onClick={() => setModalToShow("harvest")}
                  >
                    Harvest
                  </button>
                </div>
              </>
            )}
            {isLoading && (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-yello-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamDisplayModal);
