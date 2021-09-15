import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";

import "./index.scss";

import ClamView from "../saferoom/ClamView";

import clamContract from "../../web3/clam";
import { actions } from "../../store/redux";
import { getDNADecoded } from "../../web3/dnaDecoder";

const ClamDisplayModal = ({ account: { address, clamToCollect, clamBalance } }) => {
  const [clamDna, setClamDna] = useState("");
  const [clamDnaDecoded, setClamDnaDecoded] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clamBirthTime, setClamBirthTime] = useState();

  useEffect(async () => {
    if (!clamToCollect && address) {
      try {
        setIsLoading(true);

        const index = Number(clamBalance);
        const tokenId = await clamContract.getClamByIndex(address, index).catch(async () => {
          //fallback
          return clamContract.getClamByIndex(address, index - 1);
        });

        if (tokenId) {
          const clamData = await clamContract.getClamData(tokenId);

          if (clamData.dna.length > 1) {
            setClamDna(clamData.dna);
            setClamBirthTime(clamData.birthTime);

            const decodedDna = await getDNADecoded(clamData.dna).catch(console.log);
            console.log({ decodedDna });
            setClamDnaDecoded(decodedDna);
          }
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  }, [address]);

  return (
    <div className="w-2/3 md:max-w-11/12 mx-auto">
      <div className="bg-white shadow-md rounded-xl p-5 flex-1 justify-center md:flex items-center h-full flex-col w-full">
        {clamDna && clamDnaDecoded && (
          <>
            <ClamView dna={clamDna} dnaDecoded={clamDnaDecoded} birthTime={clamBirthTime} />
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
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamDisplayModal);
