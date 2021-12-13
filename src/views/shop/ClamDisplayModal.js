import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";

import "./index.scss";

import ClamView from "../saferoom/ClamView";

import clamContract from "web3/clam";
import { accountClamBalance } from "web3/clam";
import { actions } from "store/redux";
import { getClamsDataByIds } from "web3/shared";

const ClamDisplayModal = ({ onClose, account: { address, clamToCollect, clamBalance } }) => {
  const [clam, setClam] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!clamToCollect && address) {
        try {
          setIsLoading(true);
          const newClamBalance = await accountClamBalance(address);
          console.log({ clamBalance, newClamBalance });
          const index = Number(newClamBalance) - 1;
          console.log({ index });
          const tokenId = await clamContract.getClamByIndex(address, index);
          console.log({ tokenId });

          const [newestClam] = await getClamsDataByIds({
            tokenIds: [tokenId],
            clamContract,
          });

          console.log({ newestClam });
          setClam({
            ...newestClam,
          });

          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
    };
    init();
  }, [address]);

  return (
    <div className="w-2/3 mx-auto md:max-w-11/12">
      <div className="flex flex-col flex-1 w-full h-full p-5 bg-white shadow-md rounded-xl md:flex">
        <div className="cursor-pointer z-50 flex flex-row-reverse" onClick={onClose || null}>
          <svg
            className="fill-current text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 20 20"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 w-full h-full p-5 md:flex">
          {clam && <ClamView {...clam} />}
          {isLoading && (
            <>
              <svg
                className="w-5 h-5 mr-3 -ml-1 animate-spin text-yello-600"
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
    </div>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamDisplayModal);
