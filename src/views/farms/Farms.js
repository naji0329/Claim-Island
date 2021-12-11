import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import { actions } from "store/redux";
import Character from "components/characters/CharacterWrapper";
import { Modal, useModal } from "components/Modal";
import VideoBackground from "components/VideoBackground";
import { PageTitle } from "components/PageTitle";
import { sortClamsById } from "utils/clams";
import { formatNumberToLocale } from "utils/formatNumberToLocale";

import videoImage from "assets/locations/Farm.jpg";
import videoMp4 from "assets/locations/Farm.mp4";
import videoWebM from "assets/locations/Farm.webm";

import clamContract, { getMinPearlProductionDelay, getMaxPearlProductionDelay } from "web3/clam";
import {
  getStakedClamIds,
  unstakeClam,
  collectPearl,
  stakePrice,
  prepareReclaiming,
  reclaimGems,
} from "web3/pearlFarm";
import { formatFromWei, getClamsDataByIds } from "web3/shared";

import "./index.scss";
import FarmItem from "./FarmItem";
import ClamDetails from "./ClamDetails";
import ClamDeposit from "./ClamDeposit";
import { DepositClamCard } from "./depositClamCard";

import PearlView from "../saferoom/PearlView";
import { MODAL_OPTS } from "./constants";
import {
  WelcomeUser,
  withdrawClamSpeak,
  speechWelcome,
  speechWelcomeNext,
} from "./character/WithdrawClam";
import LoadingScreen from "components/LoadingScreen";

import { ifPearlSendSaferoom } from "./utils";
import { isEmpty } from "lodash";

const Farms = ({
  account: { clamBalance, isBSChain, address, clams = [] },
  updateCharacter,
  updateAccount,
  dispatchFetchAccountAssets,
  price: { gem: gemPriceUSD },
  boostParams,
}) => {
  let history = useHistory();
  const availableClamsForDepositing = [...clams].sort(sortClamsById);
  const [clamProcessing, setClamProcessing] = useState({}); // pearl process details
  const [clamsStaked, setClamsStaked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [selPearl, setSelPearl] = useState({});
  const [refreshClams, setRefreshClams] = useState(false);
  const { isShowing, toggleModal } = useModal();

  const [modalSelected, setModal] = useState("");
  const [selectedClam, setSelectedClam] = useState({});
  const [selectedClamId, setSelectedClamId] = useState({});
  const [withdrawingClamId, setWithdrawingClamId] = useState(null);
  const [pearlProductionPrice, setPearlProductionPrice] = useState(0);
  const [minPearlProductionTime, setMinPearlProductionTime] = useState(0);
  const [maxPearlProductionTime, setMaxPearlProductionTime] = useState(0);

  const isPrevButtonShown = selectedClam.clamId !== clamsStaked[0]?.clamId;
  const isNextButtonShown = selectedClam.clamId !== clamsStaked[clamsStaked.length - 1]?.clamId;

  const handleWithdraw = async (clamId) => {
    try {
      setWithdrawingClamId(clamId);
      await unstakeClam(clamId);
      await dispatchFetchAccountAssets();
    } catch (err) {
      updateAccount({ error: err.message });
      setWithdrawingClamId(null);
    }
  };

  const onModalClose = async () => {
    toggleModal();
    if (modalSelected === MODAL_OPTS.VIEW_PEARL) {
      ifPearlSendSaferoom({ updateCharacter, address, clamId: selectedClamId });
    }

    setRefreshClams(true);
  };

  // When Deposit Clam Button is clicked - open the modal to show list of clams
  const onDepositClam = () => {
    setModal(MODAL_OPTS.DEPOSIT_CLAM);
    toggleModal();
    setRefreshClams(true);
  };

  // when "View Pearl" is clicked - open the modal for the selected pearl
  const onViewDetails = (clam) => {
    setClamProcessing(clamProcessing);
    setSelectedClam(clam);
    setModal(MODAL_OPTS.CLAM_DETAILS);
    toggleModal();
  };

  // when pearl is ready and is to be viewed
  const onViewPearl = async ({ clamId, pearl, showPearlModal }) => {
    setSelectedClamId(clamId);
    if (showPearlModal) {
      setSelPearl(pearl);
      setModal(MODAL_OPTS.VIEW_PEARL);
      toggleModal();
    } else {
      try {
        await collectPearl(clamId);
        history.push("/saferoom/pearl");
        return true;
      } catch (error) {
        const errorMsg = JSON.parse(error.message.split("\n").slice(1).join(""));
        toast.error(
          <>
            <p>There was an error collecting your pearl.</p>
            <p>{errorMsg.message}</p>
          </>
        );
        return Promise.resolve(false);
      }
    }
  };

  // when "Withdraw" is clicked - open the modal
  const onWithdrawClam = (clamId) => {
    withdrawClamSpeak({ updateCharacter, clamId }, () => {
      handleWithdraw(clamId);
      WelcomeUser({ updateCharacter, suppressSpeechBubble: true });
    });
  };

  const onClickNext = () => {
    const currentClamIndex = clamsStaked.findIndex((clam) => clam.clamId === selectedClam.clamId);
    setSelectedClam(clamsStaked[currentClamIndex + 1]);
  };

  const onClickPrev = () => {
    const currentAssetIndex = clamsStaked.findIndex((clam) => clam.clamId === selectedClam.clamId);
    setSelectedClam(clamsStaked[currentAssetIndex - 1]);
  };

  useEffect(async () => {
    // wallet is connected
    if (address || refreshClams) {
      const initClams = async () => {
        try {
          if (isFirstLoading) {
            setLoading(true);
            setIsFirstLoading(false);
          }

          if (isBSChain) {
            // get staked clams
            const clamsStakedIds = await getStakedClamIds(address);
            if (!isEmpty(clamsStakedIds)) {
              const stakedClams = await getClamsDataByIds({
                tokenIds: clamsStakedIds,
                clamContract,
              });

              setClamsStaked(stakedClams);
            } else {
              console.log("when no clams staked");
              setClamsStaked([]);
            }
          }
        } catch (error) {
          console.error("farms", { error });
          updateAccount({ error: error.message });
        } finally {
          setLoading(false);
        }
      };

      await initClams();
      setRefreshClams(false);
    }
  }, [address, clamBalance, refreshClams]);

  useEffect(() => {
    if (!clamsStaked.find(({ clamId }) => clamId === withdrawingClamId)) {
      setWithdrawingClamId(null);
    }
  }, [clamsStaked]);

  useAsync(async () => {
    if (address) {
      const priceForPearlInGem = await stakePrice();
      const price = formatFromWei(priceForPearlInGem);
      setPearlProductionPrice(Number(price).toFixed(2));
      speechWelcome({ updateCharacter }, async () => {
        //     [get Pearl production price in $GEM]
        return speechWelcomeNext({ updateCharacter, gem: formatNumberToLocale(price, 2) });
      });
    } else {
      updateCharacter({
        name: "al",
        action: "farms.connect.text",
        button: {
          text: undefined,
        },
      });
    }
  }, [address]);

  useEffect(() => {
    const getPearlProductionTime = async () => {
      const [minTime, maxTime] = await Promise.all([
        getMinPearlProductionDelay(),
        getMaxPearlProductionDelay(),
      ]);
      setMinPearlProductionTime(Math.floor(moment.duration(minTime * 1000).asHours()));
      setMaxPearlProductionTime(Math.floor(moment.duration(maxTime * 1000).asHours()));
    };

    getPearlProductionTime();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {loading && <LoadingScreen />}
      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />

      <Modal
        isShowing={isShowing}
        onClose={onModalClose}
        title={
          modalSelected === MODAL_OPTS.CLAM_DETAILS || modalSelected === MODAL_OPTS.VIEW_PEARL
            ? ""
            : "Choose a Clam"
        }
        modalClassName={
          modalSelected === MODAL_OPTS.CLAM_DETAILS || modalSelected === MODAL_OPTS.VIEW_PEARL
            ? "w-4/5 max-w-5xl"
            : "w-full md:w-4/5"
        }
      >
        {modalSelected === MODAL_OPTS.CLAM_DETAILS ? (
          <ClamDetails
            clam={selectedClam}
            clamProcessing={clamProcessing}
            updateAccount={updateAccount}
            onClickPrev={isPrevButtonShown && onClickPrev}
            onClickNext={isNextButtonShown && onClickNext}
          />
        ) : modalSelected === MODAL_OPTS.DEPOSIT_CLAM ? (
          <ClamDeposit
            clams={availableClamsForDepositing}
            updateCharacter={updateCharacter}
            toggleModal={toggleModal}
            setRefreshClams={setRefreshClams}
          />
        ) : (
          <PearlView
            {...boostParams}
            {...selPearl}
            gemPriceUSD={Number(gemPriceUSD)}
            hideProduceButton={true}
          />
        )}
      </Modal>

      {address && (
        <div className="w-full lg:w-4/5 mx-auto relative z-10">
          <div className="px-2 md:px-8 py-4 mt-24 flex flex-col items-start">
            <PageTitle title="Clam Farms" />
            {/* clams and pears grid */}
            <div className="w-full my-4">
              <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-20">
                <DepositClamCard
                  pearlProductionPrice={pearlProductionPrice}
                  minPearlProductionTime={minPearlProductionTime}
                  maxPearlProductionTime={maxPearlProductionTime}
                  onClick={onDepositClam}
                />
                {clamsStaked &&
                  clamsStaked.map((clam, i) => (
                    <FarmItem
                      key={i}
                      {...clam}
                      onViewDetails={() => onViewDetails(clam)}
                      onWithdrawClam={() => onWithdrawClam(clam.clamId)}
                      onViewPearl={onViewPearl}
                      updateCharacter={updateCharacter}
                      withdrawingClamId={withdrawingClamId}
                    />
                  ))}

                {/* {PEARLS &&
                  PEARLS.map((pearl, i) => (
                    <PearlItem key={i} pearl={pearl} />
                  ))} */}
              </div>
            </div>
          </div>
        </div>
      )}

      <Character name="al" loading={loading} />
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Farms);
