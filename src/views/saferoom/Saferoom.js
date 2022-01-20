import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import "./index.scss";

import { Switch, Route, useRouteMatch, Redirect, useLocation, useHistory } from "react-router-dom";
import Character from "components/characters/CharacterWrapper";
import { Modal, useModal } from "components/Modal";
import ClamView from "./ClamView";
import PearlView from "./PearlView";
import { TabContainer } from "./TabContainer";
import { SaferoomNav } from "./SaferoomNav";
import { ClamInspect } from "./ClamInspect";
import { PearlInspect } from "./PearlInspect";

import videoImage from "assets/locations/Saferoom.jpg";
import videoMp4 from "assets/locations/Saferoom.mp4";
import videoWebM from "assets/locations/Saferoom.webm";
import VideoBackground from "components/VideoBackground";
import { PageTitle } from "components/PageTitle";
import { useWeb3Modal } from "components/Web3ProvidersModal";
import { SAFEROOM_TABS as TABS } from "constants/ui";
import { getSortedClams } from "utils/clamsSort";
import { getSortedPearls } from "utils/pearlsSort";

import { actions } from "store/redux";

import LoadingScreen from "components/LoadingScreen";

const Saferoom = ({
  ui,
  account: { clamBalance, pearlBalance, address, clams: unsortedCalms, pearls: unsortedPearls },
  updateCharacter,
  price: { gem: gemPriceUSD },
  boostParams,
  sorting: { saferoom: saferoomSorting },
  ...state
}) => {
  const [selectedAsset, setSelectedAsset] = useState();
  const [tab, setTab] = useState(clamBalance !== "0" ? TABS.clam : TABS.pearl);
  const [clams, setClams] = useState([]);
  const [pearls, setPearls] = useState([]);
  let { path, url } = useRouteMatch();
  const { search, pathname } = useLocation();
  const history = useHistory();
  const { onConnect } = useWeb3Modal(state);

  const isInspectPage = pathname.includes("inspect");

  const { isShowing, toggleModal } = useModal();

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
    if (!address) {
      updateCharacter({
        name: "tanja",
        action: "saferoom.connect.text",
        button: {
          text: "Connect Wallet",
          alt: {
            action: "cb",
            destination: onConnect,
          },
        },
        buttonAlt: {
          text: "Inspect Clam / Pearl",
          alt: {
            action: "cb",
            destination: () => {
              history.push("/saferoom/clam/inspect/-1");
            },
          },
        },
        restrictReveal: true,
      });
    }
  }, [address, pathname]);

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

  useEffect(() => {
    const { order, value } = saferoomSorting.clams;
    const sortedClams = getSortedClams(unsortedCalms, value, order);
    setClams(sortedClams);
  }, [unsortedCalms, saferoomSorting.clams.order, saferoomSorting.clams.value]);

  useEffect(() => {
    const { order, value } = saferoomSorting.pearls;
    const sortedPearls = getSortedPearls(unsortedPearls, value, order);
    setPearls(sortedPearls);
  }, [unsortedPearls, saferoomSorting.pearls.order, saferoomSorting.pearls.value]);

  useEffect(() => {
    if (pathname.includes("clam") && tab !== TABS.clam) {
      setTab(TABS.clam);
    }

    if (pathname.includes("pearl") && tab !== TABS.pearl) {
      setTab(TABS.pearl);
    }
  }, [pathname]);

  return (
    <>
      {ui.isFetching && <LoadingScreen />}

      {/* container */}
      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />

      {/* chat character   */}
      {!address && !isInspectPage && <Character name="tanja" />}

      <Modal isShowing={isShowing} onClose={toggleModal}>
        {tab === "Clam" && (
          <ClamView
            {...selectedAsset}
            gemPriceUSD={gemPriceUSD}
            {...boostParams}
            view="saferoom"
            onClickNext={isNextButtonShown() && onClickNext}
            onClickPrev={isPrevButtonShown() && onClickPrev}
          />
        )}
        {tab === "Pearl" && (
          <PearlView
            {...selectedAsset}
            gemPriceUSD={Number(gemPriceUSD)}
            {...boostParams}
            view="saferoom"
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
                      pearls={pearls}
                      openDetailedInfo={openDetailedInfo}
                    />
                  </Route>
                </Switch>
              </div>
            </>
          )}
          <Switch>
            <Route path={`${path}/clam/inspect/:tokenId`}>
              {!ui.isFetching && (
                <ClamInspect gemPriceUSD={gemPriceUSD} address={address} {...boostParams} />
              )}
            </Route>
            <Route path={`${path}/pearl/inspect/:tokenId`}>
              {!ui.isFetching && (
                <PearlInspect gemPriceUSD={gemPriceUSD} address={address} {...boostParams} />
              )}
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Saferoom);
