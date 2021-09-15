import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";

import { collectClam } from "../../web3/clam";

import Card from "../../components/Card";

import ClamPic from "../../assets/img/clam_unknown.png";
import { actions } from "../../store/redux";

import "./index.scss";
import {
  collectClamError,
  collectClamProcessing,
  collectClamSuccess,
  collectClamReady,
} from "./character/CollectClam";

const ClamCollectModal = ({
  setModalToShow,
  account: { address },
  updateCharacter,
  updateAccount,
}) => {
  const { handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useAsync(async () => {
    collectClamReady({ updateCharacter }); // character speaks
  });

  // on form submit
  const onSubmit = async (data) => {
    console.log({ data, address });
    setIsLoading(true);
    collectClamProcessing({ updateCharacter }); // character speaks

    try {
      await collectClam(address);
      setIsLoading(false);

      updateAccount({ clamToCollect: null });

      collectClamSuccess({ updateCharacter, setModalToShow }); // character speaks
      setModalToShow("display");
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      updateAccount({ error: e.message });
      collectClamError({ updateCharacter }); // character speaks
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <div className="bg-white flex-1 justify-center  md:flex items-center">
            <img src={ClamPic} width="300" />
          </div>

          <div className="py-2 flex flex-col">
            {isLoading ? (
              <button disabled={isLoading} type="submit" className="flex sending-txn-btn">
                <SVGSpinner />
                Sending transaction...
              </button>
            ) : (
              <button type="submit" className="collect-clam-btn">
                Collect Clam
              </button>
            )}
          </div>
        </Card>
      </form>
    </>
  );
};

const SVGSpinner = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-600"
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
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamCollectModal);
