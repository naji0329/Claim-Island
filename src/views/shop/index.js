import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { useEthers } from "@usedapp/core";
import { useHistory, useLocation } from "react-router-dom";

import Character from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import { PageTitle } from "components/PageTitle";

import { actions } from "../../store/redux";
import { checkHasClamToCollect } from "../../web3/clam";
import { zeroHash } from "../../web3/constants";

import videoImage from "../../assets/locations/Shop.jpg";
import videoMp4 from "../../assets/locations/Shop.mp4";
import videoWebM from "../../assets/locations/Shop.webm";
import VideoBackground from "../../components/VideoBackground";

import "./index.scss";
import ClamBuyModal from "./ClamBuyModal";
import ClamCollectModal from "./ClamCollectModal";
import ClamDisplayModal from "./ClamDisplayModal";
import ClamHarvestModal from "./ClamHarvestModal";
import { WelcomeUser } from "./character/WelcomeUser";

const Shop = ({
  account: { address, clamToCollect },
  updateCharacter,
  updateAccount,
  character,
}) => {
  const [modalToShow, setModalToShow] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const { search } = useLocation();
  const history = useHistory();
  const { activateBrowserWallet } = useEthers();

  useEffect(() => {
    if (!userReady) {
      // character greets
      WelcomeUser({
        updateCharacter,
        activateBrowserWallet,
        address,
        setModalToShow,
        setUserReady,
        clamToCollect,
        skipDialogs: character.skipDialogs,
      });
    }
  }, [address, userReady, clamToCollect]);

  useEffect(() => {
    const fetchHasClamToCollectData = async () => {
      if (address) {
        const clamToCollect = await checkHasClamToCollect(address);
        updateAccount({
          clamToCollect: clamToCollect === zeroHash ? null : clamToCollect,
        });
      }
    };
    setInterval(() => {
      fetchHasClamToCollectData();
    }, 1500);
  }, [address, modalToShow]);

  useEffect(() => {
    const query = new URLSearchParams(search);
    const paramValue = query.get("view");

    if (address && paramValue === "harvest") {
      setModalToShow("harvest");
      setUserReady(true);
      history.replace("/shop");
    }
  }, [search, address]);

  return (
    <>
      <Web3Navbar />
      {/* container */}
      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />
      {/* chat character   */}
      <Character name="diego" />
      <div className="absolute left-8 top-7">
        <PageTitle title="Clam Shop" />
      </div>
      {/* wallet is connected */}
      {address && userReady && (
        <div className="flex relative z-20  justify-center items-start top-40 w-full">
          {/* step 1 */}
          {modalToShow === "buy" && <ClamBuyModal setModalToShow={setModalToShow} />}
          {/* step 2 */}
          {modalToShow === "collect" && clamToCollect && (
            <ClamCollectModal setModalToShow={setModalToShow} />
          )}
          {/* step 3 */}
          {modalToShow === "display" && <ClamDisplayModal setModalToShow={setModalToShow} />}
          {/* step 4 */}
          {modalToShow === "harvest" && <ClamHarvestModal setModalToShow={setModalToShow} />}
        </div>
      )}
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Shop);
