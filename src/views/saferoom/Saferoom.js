import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
import "./index.scss";

import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Character from "components/characters/CharacterWrapper";
import Web3Navbar from "components/Web3Navbar";
import { Modal, useModal } from "components/Modal";
import ClamView from "./ClamView";
import NFTUnknown from "assets/img/clam_unknown.png";
import PEARLunknown from "assets/img/pearl_unknown.png";
import PearlView from "./PearlView";
import { TabContainer } from "./TabContainer";
import { SaferoomNav } from "./SaferoomNav";

import videoImage from "assets/locations/Saferoom.jpg";
import videoMp4 from "assets/locations/Saferoom.mp4";
import videoWebM from "assets/locations/Saferoom.webm";
import VideoBackground from "components/VideoBackground";
import { PageTitle } from "components/PageTitle";
import { SAFEROOM_TABS as TABS } from "constants/ui";

import { actions } from "store/redux";

import clamContract from "web3/clam";
import { getDNADecoded } from "web3/dnaDecoder";
import pearlContract from "web3/pearl";
import { getPearlDNADecoded } from "web3/pearlDnaDecoder";
import { calculateBonusRewards } from "web3/clamBonus";

import LoadingScreen from "components/LoadingScreen";

const Saferoom = ({ account: { clamBalance, pearlBalance, address }, updateCharacter }) => {
  const [clams, setClams] = useState([]);
  const [pearls, setPearls] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState();
  const [tab, setTab] = useState(clamBalance !== "0" ? TABS.clam : TABS.pearl);
  const [loading, setLoading] = useState(false);

  let { path, url } = useRouteMatch();

  const { isShowing, toggleModal } = useModal();

  const getDna = async (getByNFTIndex, getNFTData, account, index, getDecodedDNA, isClam) => {
    const tokenId = await getByNFTIndex(account, index);
    const data = await getNFTData(tokenId);

    const { dna, birthTime } = data;

    if (dna.length > 1) {
      const dnaDecoded = await getDecodedDNA(dna);
      return isClam
        ? {
            dna,
            dnaDecoded,
            birthTime,
            tokenId,
            pearlProductionCapacity: data.pearlProductionCapacity,
            pearlsProduced: data.pearlsProduced,
          }
        : { dna, dnaDecoded, birthTime, tokenId };
    }
  };

  useEffect(async () => {
    // wallet is connected and has clams
    if ((address && clamBalance !== "0") || (address && pearlBalance !== "0")) {
      try {
        setLoading(true);

        const getNFTs = async (getByNFTIndex, getNFTData, nftBalance, getDecodedDNA, isClam) => {
          let promises = [];
          for (let i = 0; i < Number(nftBalance); i++) {
            promises.push(getDna(getByNFTIndex, getNFTData, address, i, getDecodedDNA, isClam));
          }

          return await Promise.all(promises);
        };

        // parallel call to speed up
        if (+clamBalance > 0) {
          const clams = await getNFTs(
            clamContract.getClamByIndex,
            clamContract.getClamData,
            clamBalance,
            getDNADecoded,
            true
          );
          const clamsWithBonus = await Promise.all(
            clams.map(async (clam) => {
              const clamBonus = await calculateBonusRewards(clam.dnaDecoded);
              return { ...clam, clamBonus };
            })
          );
          setClams(clamsWithBonus);
        }
        if (+pearlBalance > 0) {
          const pearls = await getNFTs(
            pearlContract.getPearlByIndex,
            pearlContract.getPearlData,
            pearlBalance,
            getPearlDNADecoded
          );
          setPearls(pearls);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log({ error });
      }
    }
  }, [address, clamBalance, pearlBalance]);

  useAsync(async () => {
    updateCharacter({
      name: "tanja",
      action: "saferoom.connect.text",
      button: {
        text: undefined,
      },
    });
  });

  // on modal open/close check for cache api image and set it if exists
  const setClamsPreview = async () => {
    const cache = await caches.open("clam-island");
    const promises = await Promise.all(clams.map((clam) => cache.match(`/clams/${clam.dna}`)));
    const images = await Promise.all(
      promises.map((resp) => {
        return resp ? resp.json() : "";
      })
    );
    const clamsUptd = clams.map((clam, index) => {
      let clamImg = images[index];
      clamImg = clamImg ? clamImg.img : clamImg;
      clam.img = clamImg || NFTUnknown;
      return clam;
    });
    setClams(clamsUptd);
  };

  const setPearlsPreview = async () => {
    const cache = await caches.open("clam-island");
    const promises = await Promise.all(pearls.map((pearl) => cache.match(`/pearls/${pearl.dna}`)));
    const images = await Promise.all(
      promises.map((resp) => {
        return resp ? resp.json() : "";
      })
    );
    const pearlsUptd = pearls.map((pearl, index) => {
      let pearlImg = images[index];
      pearlImg = pearlImg ? pearlImg.img : pearlImg;
      pearl.img = pearlImg || PEARLunknown;
      return pearl;
    });
    setPearls(pearlsUptd);
  };

  const isPrevButtonShown = () => {
    if (TABS.clam === tab && selectedAsset) {
      return clams[0] !== selectedAsset;
    }

    if (TABS.pearl === tab && selectedAsset) {
      return pearls[0] !== selectedAsset;
    }

    return false;
  };

  const isNextButtonShown = () => {
    if (TABS.clam === tab && selectedAsset) {
      return clams[clams.length - 1] !== selectedAsset;
    }

    if (TABS.pearl === tab && selectedAsset) {
      return pearls[pearls.length - 1] !== selectedAsset;
    }

    return false;
  };

  const setNextAsset = (assets) => {
    const currentAssetIndex = assets.findIndex((asset) => asset === selectedAsset);
    setSelectedAsset(assets[currentAssetIndex + 1]);
  };

  const setPrevAsset = (assets) => {
    const currentAssetIndex = assets.findIndex((asset) => asset === selectedAsset);
    setSelectedAsset(assets[currentAssetIndex - 1]);
  };

  const onClickNext = () => {
    if (tab === TABS.clam) {
      setNextAsset(clams);
    }

    if (tab === TABS.pearl) {
      setNextAsset(pearls);
    }
  };
  const onClickPrev = () => {
    if (tab === TABS.clam) {
      setPrevAsset(clams);
    }

    if (tab === TABS.pearl) {
      setPrevAsset(pearls);
    }
  };

  const openDetailedInfo = (item) => {
    setSelectedAsset(item);
    toggleModal();
  };

  useEffect(() => {
    setClamsPreview();
    setPearlsPreview();
  }, [!isShowing, loading]);

  return (
    <>
      {loading && <LoadingScreen />}
      <Web3Navbar />
      {/* container */}
      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />

      {/* chat character   */}
      {!address && <Character name="tanja" />}

      <Modal isShowing={isShowing} onClose={toggleModal}>
        {tab === "Clam" && (
          <ClamView
            {...selectedAsset}
            onClickNext={isNextButtonShown() && onClickNext}
            onClickPrev={isPrevButtonShown() && onClickPrev}
          />
        )}
        {tab === "Pearl" && (
          <PearlView
            {...selectedAsset}
            onClickNext={isNextButtonShown() && onClickNext}
            onClickPrev={isPrevButtonShown() && onClickPrev}
          />
        )}
      </Modal>
      <div className="flex-1 min-h-full min-w-full flex relative z-10 justify-center items-start">
        <div className="w-4/5 flex flex-col relative pt-24">
          <PageTitle title="My Saferoom" />
          {address && (
            <>
              {/* navbar */}
              <SaferoomNav
                setTab={setTab}
                tab={tab}
                url={url}
                clamBalance={clamBalance}
                pearlBalance={pearlBalance}
              />

              {/* clams and pears grid */}
              <div className="w-full my-4 overflow-auto">
                <Switch>
                  <Route exact path={path}>
                    <Redirect to={`${url}/pearl`} />;
                  </Route>
                  <Route path={`${path}/:tabId`}>
                    <TabContainer
                      clams={clams}
                      setTab={setTab}
                      pearls={pearls}
                      openDetailedInfo={openDetailedInfo}
                    />
                  </Route>
                </Switch>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Saferoom);
