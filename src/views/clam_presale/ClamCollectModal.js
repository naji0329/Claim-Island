import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAsync } from "react-use";
import { getExplorerAddressLink, ChainId } from "@usedapp/core";
import { connect } from "redux-zero/react";

import "./index.scss";

import Card from "../../components/Card";

import presaleContract from "../../web3/buyClamPresale";
import { clamPresaleAddress } from "../../web3/constants";

import ClamUnknown from "../../assets/img/clam_unknown.png";
import { actions } from "../../store/redux";

const ClamCollectModal = ({
  account: { address },
  presale: { hasPurchasedClam },
  updateCharacter,
}) => {
  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log({ data, address });

    await presaleContract
      .collectClam(address)
      .then((res) => {
        updateCharacter({
          name: "diego",
          action: "clam_presale.congratsConllection.text",
          button: {
            text: "Dismiss",
            // alt: {
            //   action: "internal",
            //   destination: "/vault",
            // },
          },
        });
      })
      .catch((e) => {
        console.error(e);
        updateCharacter({
          name: "diego",
          action: "clam_presale.error.text",
          button: {
            text: "Dismiss",
          },
        });
      });
  };

  useAsync(async () => {
    updateCharacter({
      name: "diego",
      action: "clam_presale.conllection.text",
      button: {
        text: "Dismiss",
      },
    });
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <div className="flex flex-col mb-1">
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

          <div className="bg-white flex-1 justify-center  md:flex items-center">
            <img src={ClamUnknown} />
          </div>

          <div className="py-2 flex flex-col">
            <button
              type="submit"
              className="block font-extrabold text-center shadow bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white text-xl py-3 px-10 rounded-2xl"
            >
              Collect your Clam
            </button>
          </div>
        </Card>
      </form>
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamCollectModal);
