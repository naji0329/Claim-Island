import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
import "./index.scss";

import { Switch, Route, useRouteMatch, Redirect, useLocation, useHistory } from "react-router-dom";
import Character from "components/characters/CharacterWrapper";
import { Modal, useModal } from "components/Modal";
import ClamView from "./ClamView";
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

import LoadingScreen from "components/LoadingScreen";

const Saferoom = ({
  account: { clamBalance, pearlBalance, address, clams, pearls },
  updateCharacter,
}) => {
  const [selectedAsset, setSelectedAsset] = useState();
  const [tab, setTab] = useState(clamBalance !== "0" ? TABS.clam : TABS.pearl);
  const [loading, setLoading] = useState(true);

  let { path, url } = useRouteMatch();
  const { search, pathname } = useLocation();
  const history = useHistory();

  const { isShowing, toggleModal } = useModal();

  useEffect(async () => {
    // wallet is connected and has clams
    if (address && (+clamBalance == clams.length && +pearlBalance == pearls.length)) {
      try {
        //setLoading(true);
        // for first time needs to wait to downlaod all clams
        //if (clams.length > 0 || pearls.length > 0) {
          setLoading(false);
        //}
      } catch (error) {
        setLoading(false);
        console.log({ error });
      }
    } else {
      setLoading(false);
    }
  }, [address, clams, pearls]);

  useAsync(async () => {
    updateCharacter({
      name: "tanja",
      action: "saferoom.connect.text",
      button: {
        text: undefined,
      },
    });
  });

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
    const query = new URLSearchParams(search);
    const id = query.get("id");

    if (address && id) {
      let asset;
      if (tab === TABS.pearl) {
        asset = pearls.find(({ tokenId }) => tokenId === id);
      } else {
        asset = clams.find(({ tokenId }) => tokenId === id);
      }
      if (asset) {
        history.replace(pathname);
        openDetailedInfo(asset);
      }
    }
  }, [address, search, pearls, clams]);

  return (
    <>
      {loading && <LoadingScreen />}

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
