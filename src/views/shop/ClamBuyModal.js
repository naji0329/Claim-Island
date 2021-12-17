import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useForm } from "react-hook-form";
import { getExplorerAddressLink, ChainId } from "@usedapp/core";
import { connect } from "redux-zero/react";
import { formatEther, parseEther } from "@ethersproject/units";
import BigNumber from "bignumber.js";
import "./index.scss";
import ReactTooltip from "react-tooltip";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import Card from "components/Card";
import ClamUnknown from "assets/img/clam_unknown.png";
import ClamIcon from "assets/clam-icon.png";
import ArrowDown from "assets/img/arrow-down.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import {
  buyClam,
  getPrice,
  checkHasClamToCollect,
  buyClamWithVestedTokens,
  getMinPearlProductionDelay,
  getMaxPearlProductionDelay,
} from "web3/clam";
import { zeroHash } from "constants/constants";
import { infiniteApproveSpending } from "web3/gem";
import { getVestedGem } from "web3/gemLocker";
import { getUsdPriceOfToken } from "web3/pancakeRouter";
import { getMintedThisWeek, getClamsPerWeek } from "web3/clamShop";
import { stakePrice } from "web3/pearlFarm";
import { clamShopAddress, gemTokenAddress, BUSD } from "constants/constants";
import { actions } from "store/redux";
import { ACTIONS, CATEGORIES } from "constants/googleAnalytics";

import {
  buyClamError,
  buyClamSuccess,
  buyClamProcessing,
  buyClamWithVested,
} from "./character/BuyClam";
import { formatNumber } from "../bank/utils";
import { renderNumber } from "utils/number";
import { formatNumberToLocale } from "utils/formatNumberToLocale";

const Divider = () => (
  <div className="w-full flex flex-col justify-center items-center my-2">
    <div className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
      <img className="h-8 mr-2" src={ArrowDown} />
    </div>
  </div>
);

const ClamBuyModal = ({
  account: { gemBalance, address, clamToCollect },
  presale: { usersPurchasedClam },
  updateCharacter,
  updateAccount,
  setModalToShow,
}) => {
  const INDIVIDUAL_CAP = 5;
  const disableButton = usersPurchasedClam >= INDIVIDUAL_CAP;

  const [isLoading, setIsLoading] = useState(false);
  const [clamPrice, setClamPrice] = useState(0);
  const [clamUsdPrice, setClamUsdPrice] = useState(0);
  const [lockedGem, setLockedGem] = useState(0);
  const [canBuy, setCanBuy] = useState(false);
  const [mintedThisWeek, setMintedThisWeek] = useState("...");
  const [clamsPerWeek, setClamsPerWeek] = useState("...");
  const [minPearlProductionTime, setMinPearlProductionTime] = useState("...");
  const [maxPearlProductionTime, setMaxPearlProductionTime] = useState("...");
  const [pearlPrice, setPearlPrice] = useState("...");
  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const [_gemPrice, _clamPrice, _lockedGem, _clamsPerWeek, _mintedThisWeek] = await Promise.all(
        [getUsdPriceOfToken(gemTokenAddress, BUSD), getPrice(), getVestedGem(), getClamsPerWeek(), getMintedThisWeek()]
      );
      setClamPrice(_clamPrice);
      setLockedGem(_lockedGem);
      setClamsPerWeek(_clamsPerWeek);
      setMintedThisWeek(_mintedThisWeek);

      const getPearlProductionTime = async () => {
        const [minTime, maxTime] = await Promise.all([
          getMinPearlProductionDelay(),
          getMaxPearlProductionDelay(),
        ]);
        setMinPearlProductionTime(minTime / 3600);
        setMaxPearlProductionTime(maxTime / 3600);
      };

      getPearlProductionTime();

      const getPearlPrice = async () => {
        const pearlPrice = await stakePrice();
        setPearlPrice(formatNumberToLocale(pearlPrice, 2, true));
      };

      getPearlPrice();

      const _clamUsdPrice = new BigNumber(_clamPrice).multipliedBy(_gemPrice).div(1e18); // remove 18 decimals once

      setClamUsdPrice(_clamUsdPrice);

      if (address) {
        const clamToCollect = await checkHasClamToCollect(address);
        updateAccount({
          clamToCollect: clamToCollect === zeroHash ? null : clamToCollect,
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const balanceBN = new BigNumber(parseEther(gemBalance).toString());
    const lockedBN = new BigNumber(lockedGem * 1e18);
    const totalBN = balanceBN.plus(lockedBN);
    setCanBuy(totalBN.isGreaterThanOrEqualTo(new BigNumber(clamPrice)));

    //already has rng
    if (!!clamToCollect && clamToCollect != zeroHash) {
      setModalToShow("collect");
    }
  }, [gemBalance, clamPrice, lockedGem, clamToCollect]);

  const onSubmit = async () => {
    if (new BigNumber(lockedGem).gt(0)) {
      buyClamWithVested(
        { address, updateCharacter, gem: formatNumber(+lockedGem, 3) },
        async () => await executeBuy(true),
        async () => await executeBuy()
      );
    } else {
      await executeBuy();
    }
  };

  const executeBuy = async (withVested) => {
    setIsLoading(true);

    buyClamProcessing({ updateCharacter }); // character speaks

    await infiniteApproveSpending(address, clamShopAddress, clamPrice);

    try {
      withVested ? await buyClamWithVestedTokens(address) : await buyClam(address);

      buyClamSuccess({ updateCharacter }); // character speaks

      ReactGA.event({
        action: ACTIONS.boughtClam,
        category: CATEGORIES.shop,
        value: parseFloat(clamUsdPrice),
      });
      setIsLoading(false);
      setModalToShow("collect");
    } catch (e) {
      console.log("error", e.message);
      setIsLoading(false);
      updateAccount({ error: e.message });
      buyClamError({ updateCharacter }); // character speaks
    }
  };

  return (
    <>
      <ReactTooltip html={true} className="max-w-xl" />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <h2 className="text-blue-700 text-center font-semibold text-3xl mb-2">Get Clams</h2>

            {/* <div className="alert alert-success">
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
                  You&apos;ve bought {usersPurchasedClam} out of{" "}
                  {INDIVIDUAL_CAP} Clams allowed per address
                </label>
              </div>
            </div> */}

            {address ? (
              <a
                className="text-gray-500 text-base underline text-center p-2"
                href={getExplorerAddressLink(clamShopAddress, ChainId.BSC)}
                target="_blank"
                rel="noreferrer"
              >
                <div className="truncate w-2/3 inline-block underline">{clamShopAddress}</div>
                <FontAwesomeIcon
                  className="absolute"
                  style={{ marginTop: "2px" }}
                  icon={faExternalLinkAlt}
                />
              </a>
            ) : (
              <span className="text-yellow-400 text-center">Wallet not connected</span>
            )}
          </div>

          {/* input */}
          <div className="bg-white border-2 shadow rounded-xl">
            <div className="px-2 py-2">
              <div className="flex flex-col">
                <div className="text-lg font-semibold my-2">Price of Clam</div>
                <div className="flex flex-col text-sm text-gray-600">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex items-center text-xl">
                        <img className="w-12 h-12 mr-2" src={ClamIcon} />
                        <div className="flex flex-col text-right text-black p-2 font-extrabold">
                          <span>{renderNumber(+formatEther(clamPrice), 2)} GEM</span>
                          <span className="text-sm">{renderNumber(+clamUsdPrice, 2)} USD</span>
                        </div>
                      </div>
                      <div className="flex flex-col my-2 pl-4 w-1/2">
                        <div className="flex justify-between">
                          <span>Wallet:</span>
                          <span>{formatNumber(+gemBalance, 3)} GEM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vested:</span>
                          <span>{formatNumber(+lockedGem, 3)} GEM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>1 CLAM =</span>
                          <span>
                            {renderNumber(+formatEther(clamPrice), 2)}
                            GEM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-md font-semibold my-2">
                  {mintedThisWeek} of {clamsPerWeek} available Clams purchased this week
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* output */}
          <div className="flex flex-row justify-between items-center">
            <img className="w-1/3" src={ClamUnknown} />
            <div className="w-3/5 grid">
              <div className="w-full flex flex-row justify-between">
                <span>Lifespan</span>
                <span>5-15 Pearls</span>
              </div>
              <div className="w-full flex flex-row justify-between">
                <span>Pearl Production Time</span>
                <span>{minPearlProductionTime + "-" + maxPearlProductionTime + " hrs"}</span>
              </div>
              <div className="w-full flex flex-row justify-between">
                <span>Pearl Production Price</span>
                <span>{pearlPrice + " GEM"}</span>
              </div>
              <div className="w-full flex flex-row justify-between">
                <span>
                  Clam Boost&nbsp;
                  <button data-tip="Dependent on the traits of the Clam purchased. Applied as a multiplier to the GEM yield for every Pearl produced by a Clam, in addition to the Pearl Boost.">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </span>
                <span>0.7-30x</span>
              </div>
              <div className="w-full flex flex-row justify-between">
                <span>
                  Pearl Boost&nbsp;
                  <button data-tip="Dependent on the traits of the Pearl produced. Applied as a multiplier to the Pearl production price to give a GEM yield for the Pearl.">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </span>
                <span>0.7-30x</span>
              </div>
              <div className="w-full flex flex-row justify-between">
                <span>
                  Net GEM ROI&nbsp;
                  <button data-tip="Assuming fixed Pearl production price, Clam price and Pearl production price in GEM will fluctuate in practice">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </span>
                <span>{renderNumber((+formatEther(clamPrice) * 0.7 * 0.7 - (formatEther(clamPrice) * 2)) / (formatEther(clamPrice) * 2) * 100, 0) + "% to " + renderNumber((+formatEther(clamPrice) * 30 * 30 - (formatEther(clamPrice) * 2)) / (formatEther(clamPrice) * 2) * 100, 0) + "%"}</span>
              </div>
              <div className="w-full flex flex-row justify-between">
                <span>
                  &nbsp;
                </span>
                <span className="text-gray-400 text-sm">{"(Average " + renderNumber((+formatEther(clamPrice) * 2 * 2 - (formatEther(clamPrice) * 2)) / (formatEther(clamPrice) * 2) * 100, 0) + "%)"}</span>
              </div>
            </div>
          </div>

          <div className="py-2 flex flex-col">
            {disableButton ? (
              <button
                disabled
                type="submit"
                className="disabled cursor-not-allowed block uppercase text-center shadow bg-red-300  focus:shadow-outline focus:outline-none text-white text-xl py-3 px-10 rounded-xl"
              >
                Already purchased
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>{" "}
                    <span>Sending transaction...</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`block uppercase text-center shadow hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white text-xl py-3 px-10 rounded-xl
                        ${canBuy ? "bg-blue-600" : "btn-disabled bg-grey-light"}
                        `}
                  >
                    {canBuy ? "Buy Clam" : "Not enough GEM"}
                  </button>
                )}
              </>
            )}
          </div>
        </form>
      </Card>
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamBuyModal);
