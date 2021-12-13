import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getExplorerAddressLink, ChainId } from "@usedapp/core";
import { connect } from "redux-zero/react";
import "./index.scss";

import Card from "../../components/Card";
import ClamUnknown from "../../assets/img/clam_unknown.png";
// import BNBLogo from "../../assets/img/binance-coin-bnb-logo.png";
import ArrowDown from "../../assets/img/arrow-down.svg";

import { claimClam } from "../../web3/clamClaimers";
import { clamClaimersAddress } from "../../constants/constants";
import { actions } from "../../store/redux";

const Divider = () => (
  <div className="w-full flex flex-col justify-center items-center my-2">
    <div className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
      <img className="h-8 mr-2" src={ArrowDown} />
    </div>
  </div>
);

const ClamMintModal = ({
  account: { bnbBalance, address },
  clamClaimerData: { salePrice, usersClaimedClam, individualCap },
  updateCharacter,
  updateAccount,
}) => {
  const INDIVIDUAL_CAP = individualCap;
  const [isLoading, setIsLoading] = useState(false);
  const disableButton = usersClaimedClam >= INDIVIDUAL_CAP;

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log({ data, address });
    setIsLoading(true);

    updateCharacter({
      name: "diego",
      action: "clam_claimer.processing.text",
      button: {
        text: undefined,
      },
    });

    await claimClam(address)
      .then((res) => {
        setIsLoading(false);
        updateCharacter({
          name: "diego",
          action: "clam_claimer.congratsCollection.text",
          button: {
            text: "Ok",
          },
        });
      })
      .catch((e) => {
        setIsLoading(false);
        updateAccount({ error: e.message });
        updateCharacter({
          name: "diego",
          action: "clam_claimer.error.text",
          button: {
            text: undefined,
          },
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <div className="flex flex-col mb-4">
            <h2 className="text-blue-700 text-center font-semibold text-3xl mb-2">
              Get Clams on BSC
            </h2>

            <div className="alert alert-success">
              <div className="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mx-2 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <label>
                  You&apos;ve claimed {usersClaimedClam} out of {INDIVIDUAL_CAP} Clams allowed
                </label>
              </div>
            </div>

            {address ? (
              <a
                className="text-gray-500 text-base underline text-center p-2"
                href={getExplorerAddressLink(clamClaimersAddress, ChainId.BSC)}
                target="_blank"
                rel="noreferrer"
              >
                {clamClaimersAddress}
              </a>
            ) : (
              <span className="text-yellow-400 text-center">Wallet not connected</span>
            )}
          </div>

          <div className="flex mb-4 justify-center">
            <img className="w-2/3" src={ClamUnknown} />
          </div>

          {/* input */}
          {/* <div className="bg-white border-2 shadow rounded-xl">
            <div className="px-2 py-2">
              <div className="flex flex-col">
                <div className="text-lg font-semibold my-2">Price of Clam</div>
                <div className="flex flex-col text-sm text-gray-600">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex">
                        <img className="w-12 mr-2" src={BNBLogo} />
                        <input
                          disabled
                          value={salePrice}
                          className="bg-gray-100 text-center text-xl w-20  text-black p-2 font-normal rounded  border-none  font-extrabold"
                          {...register("input", { required: true })}
                          // onChange={(v) => {
                          //   const input = parseUnits(
                          //     v.currentTarget.value,
                          //     "wei"
                          //   ); // input in wei
                          //   const price = parseUnits(
                          //     presaleState.salePrice,
                          //     "ether"
                          //   ); // input in ether
                          //   const out = formatUnits(input.mul(price), 18);
                          //   setValue("output", out);
                          // }}
                        />
                        <span className="flex items-center  px-3 text-lg font-extrabold font-sans mx-1">
                          BNB
                        </span>
                      </div>
                      <span className="my-2">
                        {bnbBalance.slice(0, 4)} BNB available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider /> */}

          {/* output */}
          {/* <div className="bg-white border-2 shadow-xl rounded-xl">
            <div className="px-2 py-2">
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold mb-2">Clams to claim</h4>
                <div className="flex flex-col text-sm text-gray-500">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex">
                        <img className="w-12 mr-2" src={ClamUnknown} />
                        <input
                          disabled
                          value="1"
                          className="bg-gray-100 text-center text-xl w-20  text-black p-2 font-normal rounded  border-none font-extrabold"
                          {...register("output", { required: true })}
                          // onChange={(v) => {
                          //   const output = parseUnits(
                          //     v.currentTarget.value,
                          //     "ether"
                          //   ); // input in wei
                          //   const price = parseUnits(
                          //     presaleState.salePrice,
                          //     "ether"
                          //   ); // input in ether
                          //   console.log({ output, price });
                          //   const input = formatUnits(output.div(price), 18);
                          //   console.log({ output, price, input });
                          //   setValue("input", input);
                          // }}
                        />
                      </div>
                      <span className="flex items-center  px-3 text-lg font-extrabold font-sans mx-1">
                        CLAM
                      </span>

                      <div className="mx-2">1 CLAM = {salePrice} BNB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  */}

          <div className="py-2 flex flex-col">
            {disableButton ? (
              <button
                disabled
                type="submit"
                className="disabled cursor-not-allowed block uppercase text-center shadow bg-red-300  focus:shadow-outline focus:outline-none text-white text-xl py-3 px-10 rounded-xl"
              >
                Already claimed all clams
              </button>
            ) : (
              <>
                {isLoading ? (
                  <button
                    disabled={isLoading}
                    style={{ textAlign: "center" }}
                    type="submit"
                    className="flex justify-center items-center block uppercase text-center shadow bg-yellow-200 text-yellow-600 text-xl py-3 px-10 rounded-xl cursor-not-allowed"
                  >
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
                    </svg>{" "}
                    <span>Sending transaction...</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="block uppercase text-center shadow bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white text-xl py-3 px-10 rounded-xl"
                  >
                    Claim 1 Clam
                  </button>
                )}
              </>
            )}
          </div>
        </Card>
      </form>
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamMintModal);
