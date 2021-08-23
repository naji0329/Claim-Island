import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
import "./index.scss";

import { Link } from "react-router-dom";
import Character from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import clamIcon from "../../assets/clam-icon.png";
import { Modal, useModal } from "../../components/Modal";
import NFTItem from "./NFTItem";
import ClamView from "./ClamView";
import PearlView from "./PearlView";

import videoImage from "../../assets/locations/saferoom_static.jpg";

import { actions } from "../../store/redux";

import clamContract from "../../web3/clam";
import { getDNADecoded } from "../../web3/dnaDecoder";

import pearlContract from "../../web3/pearl";
import { getPearlDNADecoded } from "../../web3/pearlDnaDecoder";

import { get } from "lodash";

const Saferoom = ({
  account: { clamBalance, pearlBalance, address },
  updateCharacter,
}) => {
  const [clams, setClams] = useState([]);
  const [pearls, setPearls] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState();
  const [tab, setTab] = useState(clamBalance !== "0" ? "Clam" : "Pearl");
  const [loading, setLoading] = useState(false);

  const { isShowing, toggle } = useModal();

  const getDna = async (
    getByNFTIndex,
    getNFTData,
    account,
    index,
    getDecodedDNA
  ) => {
    const tokenId = await getByNFTIndex(account, index);
    const data = await getNFTData(tokenId);
    const { dna } = data;

    if (dna.length > 1) {
      const dnaDecoded = await getDecodedDNA(dna);
      return { dna, dnaDecoded };
    }
  };

  useEffect(async () => {
    // wallet is connected and has clams
    if ((address && clamBalance !== "0") || (address && pearlBalance !== "0")) {
      try {
        setLoading(true);

        const getNFTs = async (
          getByNFTIndex,
          getNFTData,
          nftBalance,
          getDecodedDNA
        ) => {
          let promises = [];
          for (let i = 0; i < Number(nftBalance); i++) {
            promises.push(
              getDna(getByNFTIndex, getNFTData, address, i, getDecodedDNA)
            );
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
        // text: "Ok",
        // alt: {
        //   action: "cb",
        //   dismiss: true,
        //   destination: () => {
        //     setShowClams(true);
        //   },
        // },
      },
    });
  });

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <div className="loading-elems">
            <img src={clamIcon} />
            <p>Loading...</p>
          </div>
        </div>
      )}
      <Web3Navbar />
      {/* container */}
      <div className="saferoom-bg w-full h-screen flex items-center overflow-hidden fixed bg-gradient-to-t from-blue-400 to-green-500">
        <video
          autoPlay
          muted
          loop
          className="flex-1 h-full w-full md:flex relative z-10 object-cover object-center"
        >
          <source
            src={
              process.env.PUBLIC_URL + "/location_vids/saferoom_animated.mp4"
            }
            type="video/mp4"
          />
          <source
            src={
              process.env.PUBLIC_URL +
              "/location_vids/saferoom_animated_webm.webm"
            }
            type='video/webm; codecs="vp8, vorbis"'
          />
          <img
            src={videoImage}
            title="Your browser does not support the video"
          ></img>
        </video>
      </div>

      {/* chat character   */}
      {!address && <Character name="tanja" />}

      <Modal isShowing={isShowing} onClose={toggle}>
        {tab === "Clam" && <ClamView {...selectedAsset} />}
        {tab === "Pearl" && <PearlView {...selectedAsset} />}
      </Modal>
      {address && (
        <div className="flex-1 min-h-full min-w-full flex relative z-20  justify-center items-start">
          <div className="w-4/5 flex flex-col relative pt-24">
            {/* navbar */}
            <div className="w-full bg-white shadow-md rounded-xl mx-auto flex flex-row justify-between">
              <div className="px-3 py-2">
                <h2 className="text-blue-700 font-semibold text-4xl mb-2">
                  My Saferoom
                </h2>
                <p className="text-yellow-700">All you minted NFTs</p>
              </div>

              <div className="px-3 py-2 flex justify-between">
                <button
                  className={`mx-2 px-5 ${
                    tab === "Clam"
                      ? "rounded-xl bg-blue-400 text-white"
                      : "text-blue-700"
                  }`}
                  onClick={() => setTab("Clam")}
                >
                  Clams
                </button>
                <button
                  className={`mx-2 px-5 ${
                    tab === "Pearl"
                      ? "rounded-xl bg-blue-400 text-white"
                      : "text-blue-700"
                  }`}
                  onClick={() => setTab("Pearl")}
                >
                  Pearls
                </button>
                <Link
                  to="/shop"
                  className="bg-blue-700 hover:bg-blue-500 text-white rounded-xl shadow-md px-5 py-6 mx-2"
                >
                  Shop
                </Link>
              </div>
            </div>

            {/* clams and pears grid */}
            <div
              className="w-full my-4 overflow-auto"
              style={{ height: "50rem" }}
            >
              {tab === "Clam" && clams && clams.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
                  {clams &&
                    clams.map((clam, i) => {
                      const rarity = get(clam.dnaDecoded, "rarity");
                      const shape = get(clam.dnaDecoded, "shellShape");

                      return (
                        <div
                          onClick={() => {
                            setSelectedAsset(clam);
                            toggle();
                          }}
                          key={i}
                        >
                          <NFTItem rarity={rarity} shape={shape} />
                        </div>
                      );
                    })}
                </div>
              )}

              {tab === "Pearl" && pearls && pearls.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
                  {pearls &&
                    pearls.map((pearl, i) => {
                      const rarity = get(pearl.dnaDecoded, "rarity");
                      const shape = get(pearl.dnaDecoded, "shape");

                      return (
                        <div
                          onClick={() => {
                            setSelectedAsset(pearl);
                            toggle();
                          }}
                          key={i}
                        >
                          <NFTItem rarity={rarity} shape={shape} />
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Saferoom);
