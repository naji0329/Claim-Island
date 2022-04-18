import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

import { get } from "lodash";
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
  const [isClamShowing, toogleClamShowing] = useState(false);
  const [isPearlShowing, tooglePearlShowing] = useState(false);

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


  const mopenClamDetailedInfo = (item) => {
    tooglePearlShowing(false);
    setSelectedAsset(item);
    console.log(item)
    toogleClamShowing(true);
  }
  
  const mopenPearlDetailedInfo = (item) => {
    toogleClamShowing(false);
    setSelectedAsset(item);
    console.log('pearl item data:', item);
    tooglePearlShowing(true);
  }

  const showlists = () => {
    tooglePearlShowing(false);
    toogleClamShowing(false);
  }

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

      <div className="saferoom_lg" style={{ display: !address ? "block" : "" }}>
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
      </div>
      <div className="saferoom_sm" style={{ display: address ? "" : "none" }}>
        <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />

        {
          isClamShowing ? (
            <ClamView
              {...selectedAsset}
              gemPriceUSD={gemPriceUSD}
              {...boostParams}
              view="saferoom"
              onClickNext={isNextButtonShown() && onClickNext}
              onClickPrev={isPrevButtonShown() && onClickPrev}
              mopenPearlDetailedInfo={mopenPearlDetailedInfo}
              showlists={showlists}
            />
          ) : (
            <></>
          )
        }

        {
          isPearlShowing ? (
            <PearlView
              {...selectedAsset}
              gemPriceUSD={Number(gemPriceUSD)}
              {...boostParams}
              view="saferoom"
              onClickNext={isNextButtonShown() && onClickNext}
              onClickPrev={isPrevButtonShown() && onClickPrev}
              showlists={showlists}
            />
          ) : (
            <></>
          )
        }

        <Switch>
          <Route path={`/saferoom/clam`}>

            <div className="pearlDiv mb-3" style={{ display: isClamShowing || isPearlShowing ? "none" : "block" }}>
              <h1 className="title">My Clams</h1>

              <div className="pearlitems grid grid-cols-2 gap-4">
                {clams &&
                  clams.map((clam, i) => {
                    const rarity = get(clam.dnaDecoded, "rarity");

                    let shape = get(clam.dnaDecoded, "shellShape");
                    let lifespan = get(clam.dnaDecoded, "lifespan");
                    let rarityValue = get(clam.dnaDecoded, "rarityValue");
                    shape = shape.charAt(0).toUpperCase() + shape.slice(1);
                    return (
                      <div key={i} className="pearlitem text-center p-2">
                        <div className="flex align-center items-center justify-center" style={{minHeight: "85px"}} >
                          <img src={clam.img} alt="" style={{ width: "60%", height: "auto" }}/>
                        </div>
                        
                        <div className="">
                          <p className="mt-1">{clam.clamId}</p>
                          <div className="flex justify-between w-100 m-auto">
                            <div>
                              <p className="lifeSpan">Lifespan</p>
                              <p className="lifeSpanValue">{lifespan} Pearls</p>
                            </div>
                            <div>
                              <p className="lifeRarity">Rarity</p>
                              <p className="lifeRarityValue">{rarity}</p>
                            </div>
                          </div>
                          <div>
                            <button className="selectBtn" onClick={() => { mopenClamDetailedInfo(clam) }}>Select</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Route>
          <Route path={`/saferoom/pearl`}>


            <div className="pearlDiv mb-3" style={{ display: isPearlShowing ? "none" : "block" }}>
              <h1 className="title">My Pearls</h1>

              <div className="pearlitems grid grid-cols-2 gap-4">
                {pearls &&
                  pearls.map((pearl, i) => {
                    const rarity = get(pearl.dnaDecoded, "rarity");
                    let shape = get(pearl.dnaDecoded, "shape");
                    shape = shape.charAt(0).toUpperCase() + shape.slice(1);

                    return (
                      <div key={i} className="pearlitem text-center p-2">
                        <div className="flex align-center items-center justify-center" style={{minHeight: "85px"}} >
                          <img src={pearl.img} alt="" style={{ width: "60%", height: "auto" }}/>
                        </div>
                        
                        <p className="mt-1">{pearl.pearlId}</p>
                        <div className="flex justify-between w-100 m-auto">
                          <div>
                            <p className="lifeSpan">Rarity</p>
                            <p className="lifeSpanValue">{rarity}</p>
                          </div>
                          <div>
                            <p className="lifeRarity">Shape</p>
                            <p className="lifeRarityValue">{shape}</p>
                          </div>
                        </div>
                        <div>
                          <button className="selectBtn" onClick={() => { mopenPearlDetailedInfo(pearl) }}>Select</button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Route>

        </Switch>





        <div className="bottom_menu" style={{ borderTop: "1px solid blue" }}>
          <div className="menu_item active">
            <Link to="/">
              <img src="/saferoom/map.png" alt="" />
              <p>Map</p>
            </Link>
          </div>
          <div className="menu_item">
            <Link to="/saferoom/clam" onClick={() => { toogleClamShowing(false); tooglePearlShowing(false); }}>
              <img src="/saferoom/clam.png" alt="" />
              <p>Clams</p>
            </Link>
          </div>
          <div className="menu_item">
            <Link to="/saferoom/pearl" onClick={() => { toogleClamShowing(false); tooglePearlShowing(false); }}>
              <img src="/saferoom/pearl.png" alt="" />
              <p>Pearls</p>
            </Link>
          </div>
          <div className="menu_item">
            <Link to="/saferoom/clam/inspect/-1">
              <img src="/saferoom/opened.png" alt="" />
              <p>Inspector</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Saferoom);