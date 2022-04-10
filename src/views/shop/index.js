import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { useInterval } from "react-use";
import { useHistory, useLocation } from "react-router-dom";
import { actions } from "store/redux";
import { checkHasClamToCollect } from "web3/clam";
import { zeroHash } from "constants/constants";

import Character from "components/characters/CharacterWrapper";
import { PageTitle } from "components/PageTitle";
import VideoBackground from "components/VideoBackground";
import { useWeb3Modal } from "components/Web3ProvidersModal";

import videoImage from "assets/locations/Shop.jpg";
import videoMp4 from "assets/locations/Shop.mp4";
import videoWebM from "assets/locations/Shop.webm";

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
  ...state
}) => {
  const [modalToShow, setModalToShow] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const { search } = useLocation();
  const history = useHistory();

  const { onConnect } = useWeb3Modal({ ...state, updateAccount });

  useEffect(() => {
    if (!userReady) {
      // character greets
      WelcomeUser({
        updateCharacter,
        onConnect,
        address,
        setModalToShow,
        setUserReady,
        clamToCollect,
        skipDialogs: character.skipDialogs,
      });
    }
  }, [address, userReady, clamToCollect]);

  useInterval(
    async () => {
      if (modalToShow === "collect" && clamToCollect === null) {
        const clamToCollect = await checkHasClamToCollect(address);
        updateAccount({
          clamToCollect: clamToCollect === zeroHash ? null : clamToCollect,
        });
      }
    },
    modalToShow === "collect" ? 1500 : null
  );

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
          {modalToShow === "collect" && <ClamCollectModal setModalToShow={setModalToShow} />}
          {/* step 3 */}
          {modalToShow === "display" && <ClamDisplayModal onClose={() => setModalToShow("")} />}
          {/* step 4 */}
          {modalToShow === "harvest" && <ClamHarvestModal setModalToShow={setModalToShow} />}
        </div>
      )}
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Shop);
