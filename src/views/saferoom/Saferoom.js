import React, { useState } from "react";
import { connect } from "redux-zero/react";
import Character from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import LoaderSpinner from "../../components/LoaderSpinner";

import video from "../../assets/locations/saferoom_animated.mp4";
import videoImage from "../../assets/locations/clam_island_saferoom.png";

import { actions } from "../../store/redux";
import { PEARLS, CLAMS } from "../../constants";
import { useAsync } from "react-use";

const getPearlImage = (p) =>
  require(`../../assets/img/clamjam/${p.src}`).default;

const getClamImage = (c) =>
  require(`../../assets/img/clamjam/${c.src}`).default;

const ClamItem = ({ clam }) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-b-4 border-blue-500 flex flex-col justify-between">
        <img
          src={getClamImage(clam)}
          alt="People"
          className="w-full object-cover h-32 sm:h-48 md:h-64"
        />

        <div className="p-4 md:p-6">
          <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
            {clam.title}
          </h3>
        </div>

        <div className="px-4 md:px-6 py-2">
          <div className="text-sm flex flex-row justify-between">
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Lifespan
              </p>
              <p className="font-bold leading-none">5 pearls</p>
            </div>

            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Rarity
              </p>
              <p className="font-bold leading-none">50.03</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PearlItem = ({ pearl }) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-b-4 border-blue-500 flex flex-col justify-between">
        <img
          src={getPearlImage(pearl)}
          alt="Pearl"
          className="w-full object-cover h-32 sm:h-48 md:h-64"
        />

        <div className="p-4 md:p-6">
          <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
            {pearl.title}
          </h3>
        </div>

        <div className="px-4 md:px-6 py-2">
          <div className="text-sm flex flex-row justify-between">
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Power
              </p>
              <p className="font-bold leading-none">Boost yield by 5x</p>
            </div>

            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Rarity
              </p>
              <p className="font-bold leading-none">50.03</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Saferoom = ({ account: { clamBalance, address }, updateCharacter }) => {
  const [showClams, setShowClams] = useState(false);

  useAsync(async () => {
    updateCharacter({
      name: "tanja",
      action: "saferoom.connect.text",
      button: {
        text: "Ok",
        alt: {
          action: "cb",
          dismiss: true,
          destination: () => {
            setShowClams(true);
          },
        },
      },
    });
  });

  return (
    <>
      <Web3Navbar />
      {/* container */}
      <div className="shop-bg w-full h-screen flex items-center overflow-hidden fixed bg-gradient-to-t from-blue-400 to-green-500">
        <video
          autoPlay
          muted
          loop
          className="flex-1 h-full w-full md:flex absolute z-10 object-cover object-center"
        >
          <source src={video} type="video/mp4" />
          <img
            src={videoImage}
            title="Your browser does not support the video"
          ></img>
        </video>

        {/* chat character   */}
        <Character name="tanja" />

        {/* modal   -top-0 md:-top-64 */}
        {showClams && (
          <div className="flex-1 min-h-full min-w-full flex absolute z-20  justify-center items-start mt-64">
            <div className="w-4/5 flex flex-col">
              {/* navbar */}
              <div className="w-full bg-white shadow-md rounded-xl mx-auto flex flex-row justify-between">
                <div className="w-1/3 px-3 py-2">
                  <h2 className="text-blue-700 font-semibold text-4xl mb-2">
                    My Saferoom
                  </h2>
                  <p className="text-yellow-700">All you minted NFTs</p>
                </div>

                <div className="w-1/4 px-3 py-2 flex justify-between">
                  <button className="text-blue-700 hover:underline px-5">
                    All
                  </button>
                  <button className="bg-blue-700 hover:bg-blue-500 text-white rounded-xl shadow-md px-5">
                    Shop
                  </button>
                </div>
              </div>

              {/* clams and pears grid */}
              <div
                className="w-full my-4 overflow-auto"
                style={{ height: "50rem" }}
              >
                <div className="grid grid-cols-5 gap-4">
                  {CLAMS &&
                    CLAMS.map((clam, i) => <ClamItem key={i} clam={clam} />)}
                  {PEARLS &&
                    PEARLS.map((pearl, i) => (
                      <PearlItem key={i} pearl={pearl} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Saferoom);
