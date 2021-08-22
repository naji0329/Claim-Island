import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { useEthers } from "@usedapp/core";
import "./index.scss";
import CharacterWrapper from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";

import { actions } from "../../store/redux";
// import { SPEECHES } from "../../components/characters/constants";
import ClamBuyModal from "./ClamBuyModal";
import ClamCollectModal from "./ClamCollectModal";
import ClamDisplayModal from "./ClamDisplayModal";
import { checkHasClamToCollect } from '../../web3/clam'
import { zeroHash } from '../../web3/constants'

const Shop = ({
  account: { address, clamToCollect },
  updateCharacter,
  updateAccount,
}) => {
  const [modalToShow, setModalToShow] = useState(null) 
  const [userReady, setUserReady] = useState(false);
  
  const { activateBrowserWallet } = useEthers();

  useEffect(() => {
    updateCharacter({
      name: "diego",
      action: "clam_shop.welcome.text",
      button: {
        text: "Let's go!",
        alt: {
          action: "cb",
          destination: () => {
            if (address) {
              updateCharacter({
                name: "diego",
                action: "clam_shop.choose_path.text",
                buttonAlt: {
                  text: "Harvest Clams",
                  // alt: {
                  //   action: "cb",
                  //   destination: () => {
                  //     setShowBuyModal(true);
                  //     updateCharacter({
                  //       name: "diego",
                  //       action: "clam_claimer.claim.text",
                  //       button: {
                  //         text: "Back to Island",
                  //         alt: {
                  //           action: "internal",
                  //           destination: "/",
                  //         },
                  //       },
                  //       buttonAlt: {
                  //         text: "Go to Saferoom",
                  //         alt: {
                  //           action: "internal",
                  //           destination: "/saferoom",
                  //         },
                  //       },
                  //     });
                  //   },
                  // },
                },
                button: {
                  text: "Buy Clams",
                  alt: {
                    action: "cb",
                    destination: () => {
                      setUserReady(true)
                      
                      console.log('clamToCollect', clamToCollect);
                      if (clamToCollect) {
                        updateCharacter({
                          name: "diego",
                          action: "clam_shop.collect.text",
                          button: {
                            text: "Got it, Boss",
                            dismiss: true
                          },
                        });
                        setModalToShow('collect')
                      } else {
                        updateCharacter({
                          name: "diego",
                          action: null,
                        });
                        setModalToShow('buy')
                      }
                      
                    },
                  },
                },
              });
            } else {
              updateCharacter({
                name: "diego",
                action: "clam_presale.connect.text",
                button: {
                  text: 'Connect',
                  alt: {
                    action: "cb",
                    destination: activateBrowserWallet
                  }
                },
              });
            }
            
          },
        },
      },
    });
  }, [address])

  useEffect(() => {
    if (address) {
      checkHasClamToCollect(address).then(clamToCollect => {
        updateAccount({ clamToCollect: clamToCollect === zeroHash ? null : clamToCollect })
      })
    }
  }, [address, modalToShow]);

  return (
    <>
      <Web3Navbar />
      {/* container */}
      <div className="shop-bg w-full h-screen flex items-center overflow-hidden fixed bg-gradient-to-t from-blue-400 to-green-500">
        <video
          autoPlay
          muted
          loop
          className="flex-1 h-full w-full md:flex relative z-10 object-cover object-center"
        >
          <source src={process.env.PUBLIC_URL + "/location_vids/shop_animated.mp4"} type="video/mp4" />
          <source src={process.env.PUBLIC_URL + "/location_vids/shop_animated_webm.webm"}  type='video/webm; codecs="vp8, vorbis"' />
        </video>

        {/* chat character   */}
        <div className="flex-1 min-h-full min-w-full  md:flex items-center absolute z-20">
          <CharacterWrapper name="diego" />
        </div>

        {/* modal   -top-0 md:-top-64 */}
        <div className="flex-1 justify-center min-h-full min-w-full flex items-center absolute z-30 pointer-events-none pb-60">
          {
            address && // wallet is connected
            userReady &&
            modalToShow === 'collect' && clamToCollect ? <ClamCollectModal setModalToShow={setModalToShow} /> :
              modalToShow === 'buy' ? <ClamBuyModal setModalToShow={setModalToShow}  />  :
                modalToShow === 'display' ? <ClamDisplayModal setModalToShow={setModalToShow} /> :
                  null
                  
            // showBuyModal ? // user has agreed clicked Yes
            //   clamToCollect && !showClamDisplayModal ? 
            //     <ClamCollectModal setShowClamDisplayModal={setShowClamDisplayModal} /> :
            //     <ClamBuyModal setShowBuyModal={setShowBuyModal}  />
            // : showClamDisplayModal && <ClamDisplayModal setShowBuyModal={setShowBuyModal} />
          }
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Shop);
