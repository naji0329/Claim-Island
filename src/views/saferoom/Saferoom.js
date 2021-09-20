import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
import "./index.scss";

import { Link, Switch, Route, useRouteMatch, useParams, Redirect } from "react-router-dom";
import Character from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import clamIcon from "../../assets/clam-icon.png";
import { Modal, useModal } from "../../components/Modal";
import NFTItem from "./NFTItem";
import ClamView from "./ClamView";
import NFTUnknown from "../../assets/img/clam_unknown.png";
import PEARLunknown from "../../assets/img/pearl_unknown.png";
import PearlView from "./PearlView";

import videoImage from "../../assets/locations/Saferoom.jpg";
import videoMp4 from "../../assets/locations/Saferoom.mp4";
import videoWebM from "../../assets/locations/Saferoom.webm";
import VideoBackground from "../../components/VideoBackground";

import { actions } from "../../store/redux";

import clamContract from "../../web3/clam";
import { getDNADecoded } from "../../web3/dnaDecoder";

import pearlContract from "../../web3/pearl";
import { getPearlDNADecoded } from "../../web3/pearlDnaDecoder";

import { get } from "lodash";

import LoadingScreen from "components/LoadingScreen";

const Saferoom = ({ account: { clamBalance, pearlBalance, address }, updateCharacter }) => {
  const [clams, setClams] = useState([]);
  // const [clams, setClams] = useState(TEST_CLAMS)
  const [pearls, setPearls] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState();
  const [tab, setTab] = useState(clamBalance !== "0" ? "Clam" : "Pearl");
  const [loading, setLoading] = useState(false);

  let { path, url } = useRouteMatch();

  const { isShowing, toggleModal } = useModal();

  const getDna = async (getByNFTIndex, getNFTData, account, index, getDecodedDNA) => {
    const tokenId = await getByNFTIndex(account, index);
    const data = await getNFTData(tokenId);

    const { dna, birthTime } = data;

    if (dna.length > 1) {
      const dnaDecoded = await getDecodedDNA(dna);
      return { dna, dnaDecoded, birthTime, tokenId };
    }
  };

  useEffect(async () => {
    // wallet is connected and has clams
    if ((address && clamBalance !== "0") || (address && pearlBalance !== "0")) {
      try {
        setLoading(true);

        const getNFTs = async (getByNFTIndex, getNFTData, nftBalance, getDecodedDNA) => {
          let promises = [];
          for (let i = 0; i < Number(nftBalance); i++) {
            promises.push(getDna(getByNFTIndex, getNFTData, address, i, getDecodedDNA));
          }

          return await Promise.all(promises);
        };

        // parallel call to speed up
        if (+clamBalance > 0) {
          const clams = await getNFTs(
            clamContract.getClamByIndex,
            clamContract.getClamData,
            clamBalance,
            getDNADecoded
          );
          setClams(clams);
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

  useEffect(() => {
    setClamsPreview();
    setPearlsPreview();
  }, [!isShowing, loading]);

  return (
    <>
      {loading && <LoadingScreen />}
      <Web3Navbar title="My Saferoom" />
      {/* container */}
      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />

      {/* chat character   */}
      {!address && <Character name="tanja" />}

      <Modal isShowing={isShowing} onClose={toggleModal}>
        {tab === "Clam" && <ClamView {...selectedAsset} />}
        {tab === "Pearl" && <PearlView {...selectedAsset} />}
      </Modal>

      {address && (
        <div className="pt-24 flex-1 min-h-full min-w-full flex relative z-10 justify-center items-start">
          <div className="w-4/5 flex flex-col relative pt-24">
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
                    setSelectedAsset={setSelectedAsset}
                    toggle={toggleModal}
                    setTab={setTab}
                    pearls={pearls}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SaferoomNav = ({ setTab, tab, url, clamBalance, pearlBalance }) => {
  const showNumberOfAssets = (number, asset) => {
    return +number > 1 ? `${number} ${asset}s` : `${number} ${asset}`;
  };

  return (
    <div className="w-full rounded-xl mx-auto flex">
      <div className="flex flex-none bg-gray-900 bg-opacity-80 p-2 rounded">
        <Link
          className={`px-5 py-2 text-2xl ${
            tab === "Clam" ? " text-blue-700 bg-gray-200 bg-opacity-80 rounded" : "text-gray-400"
          }`}
          to={`${url}/clam`}
          onClick={() => setTab("Clam")}
        >
          {showNumberOfAssets(clamBalance, "Clam")}
        </Link>

        <Link
          className={`px-5 py-2  text-2xl ${
            tab === "Pearl" ? "text-blue-700  bg-gray-200 bg-opacity-80 rounded" : "text-gray-400"
          }`}
          to={`${url}/pearl`}
          onClick={() => setTab("Pearl")}
        >
          {showNumberOfAssets(pearlBalance, "Pearl")}
        </Link>
      </div>
      <div className="flex-grow"></div>
      <Link to="/shop">
        <div className="flex-none text-2xl bg-blue-700 hover:bg-blue-500 text-white rounded-xl align-middle shadow-md px-8 py-2 mx-2">
          Shop
        </div>
      </Link>
    </div>
  );
};

const TabContainer = ({ clams, setSelectedAsset, toggle, pearls, setTab }) => {
  let { tabId } = useParams();

  useEffect(() => {
    setTab(tabId[0].toUpperCase() + tabId.slice(1));
  }, []);

  return (
    <>
      {tabId === "clam" && clams && clams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
          {clams &&
            clams.map((clam, i) => {
              const rarity = get(clam.dnaDecoded, "rarity");

              let shape = get(clam.dnaDecoded, "shellShape");
              shape = shape.charAt(0).toUpperCase() + shape.slice(1);
              return (
                <div
                  onClick={() => {
                    setSelectedAsset(clam);
                    toggle();
                  }}
                  key={i}
                >
                  <NFTItem rarity={rarity} shape={shape} img={clam.img} tokenId={clam.tokenId} />
                </div>
              );
            })}
        </div>
      )}

      {tabId === "pearl" && pearls && pearls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
          {pearls &&
            pearls.map((pearl, i) => {
              const rarity = get(pearl.dnaDecoded, "rarity");
              let shape = get(pearl.dnaDecoded, "shape");
              shape = shape.charAt(0).toUpperCase() + shape.slice(1);
              return (
                <div
                  onClick={() => {
                    setSelectedAsset(pearl);
                    toggle();
                  }}
                  key={i}
                >
                  <NFTItem rarity={rarity} shape={shape} img={pearl.img} tokenId={pearl.tokenId} />
                </div>
              );
            })}
        </div>
      )}
      {!pearls.length && !clams.length && (
        <div className="w-full bg-white shadow-md rounded-xl text-center text-2xl p-5 text-black">
          You&#39;ve got no clams or pearls &#128542;
        </div>
      )}
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Saferoom);
