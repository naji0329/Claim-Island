import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getExplorerAddressLink, ChainId } from "@usedapp/core";
import { connect } from "redux-zero/react";
import "./index.scss";

import presaleContract from "../../web3/buyClamPresale";
import { clamPresaleAddress } from "../../web3/constants";

import ClamUnknown from "../../assets/img/clam_unknown.png";

const ClamCollectModal = ({
  account: { address },
  presale: { hasPurchasedClam },
}) => {
  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log({ data, address });

    await presaleContract
      .collectClam(address)
      .then((res) => {
        alert("You just got a CLAM! Congrats!");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden mx-auto">
            <div className="py-4 px-8 mt-3">
              <div className="flex flex-col mb-8">
                <h2 className="text-blue-700 font-semibold text-2xl tracking-wide mb-2">
                  Get Clams on BSC
                </h2>
                <a
                  className="text-gray-500 text-base underline"
                  href={getExplorerAddressLink(clamPresaleAddress, ChainId.BSC)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {clamPresaleAddress}
                </a>
              </div>

              {/* input */}
              <div className="bg-white flex-1 justify-center  md:flex items-center">
                <img src={ClamUnknown} />
              </div>

              <div className="py-4 flex flex-col">
                <button
                  type="submit"
                  className="block font-extrabold text-center shadow bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white text-2xl py-3 px-10 rounded-2xl"
                >
                  Collect your Clam
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps)(ClamCollectModal);
