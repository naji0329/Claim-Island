import React from "react";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import NetworkService from "utils/NetworkService";
import { NavBarUserProfile } from "./navBarUserProfile";

import ClamIcon from "../assets/img/clam_icon.png";
import PearlIcon from "../assets/img/pearl_icon.png";
import GemIcon from "../assets/img/gems_icon.png";
import ShellIcon from "../assets/img/shell_icon.png";

const ErrorAlert = ({ title, description, onClose }) => (
  <div className="w-full absolute">
    <div
      className="bg-red-200 border-t-4 border-red-600 rounded-md text-red-800 p-4 m-2 mt-5 fixed z-9999"
      role="alert"
    >
      <div className="flex">
        <svg
          className="h-6 w-6 fill-current text-red-500 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
        </svg>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm ">{description}</p>
        </div>

        <svg
          onClick={onClose}
          className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
        >
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
        </svg>
      </div>
    </div>
  </div>
);

const IconTip = ({ children, text }) => (
  <span data-tip={text} className="cursor-pointer tooltip">
    {children}
  </span>
);

const Navbar = ({
  onDisconnect,
  updateAccount,
  price,
  account: {
    error,
    isBSChain,
    address,
    gemBalance,
    shellBalance,
    clamBalance,
    pearlBalance,
    clamBalanceInFarm,
    pearlBalanceInFarm,
  },
}) => {
  const location = useLocation();

  return (
    <>
      {error ? (
        <ErrorAlert
          title="Something Wrong"
          description={error}
          onClose={() => {
            updateAccount({ error: null });
          }}
        />
      ) : (
        <>
          {!isBSChain && (
            <ErrorAlert
              title="Wrong Network"
              description={
                <>
                  You must be connected to{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://docs.binance.org/smart-chain/wallet/metamask.html"
                    className="underline"
                  >
                    Binance Smart Chain
                  </a>{" "}
                  network. Click{" "}
                  <a
                    className="cursor-pointer underline"
                    onClick={async () => {
                      await NetworkService.createOrSwitchNetwork();
                    }}
                  >
                    here
                  </a>{" "}
                  for add/switch to a Binance network in your Metamask
                </>
              }
            />
          )}
        </>
      )}

      {/* <nav className="flex min-h-48 min-w-full justify-end fixed px-6 py-4 bg-transparent mt-2 z-20">
        <div className="w-full lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
          <div className="flex"> */}
      {address && (
  <>
          <div className="flex lg:mt-0 px-4 py-2 mr-2 rounded-xl shadow bg-gray-600 my-2 justify-center bg-opacity-80">
            <span className="p-1 text-sm text-gray-200 font-bold font-sans">
              Balance: {Number(gemBalance).toFixed(2)}{" "}
              <IconTip text="$GEM Balance">
                <img style={{ maxHeight: "1rem", marginBottom: "-0.1rem" }} src={GemIcon} />
              </IconTip>{" "}
              | {Number(shellBalance).toFixed(2)}{" "}
              <IconTip text="$SHELL Balance">
                <img style={{ maxHeight: "1rem", marginBottom: "-0.1rem" }} src={ShellIcon} />
              </IconTip>
            </span>
          </div>

          <div className="flex lg:mt-0 px-4 py-2 mr-2 rounded-xl shadow bg-gray-600 my-2 justify-center bg-opacity-80">
            <span className="p-1 text-sm text-gray-200 font-bold font-sans">
              Price:{" "}
              <IconTip text="Price of 1 $GEM">
                <img style={{ maxHeight: "1rem", marginBottom: "-0.1rem" }} src={GemIcon} />
              </IconTip>{" "}
              = $ {price.gem} |{" "}
              <IconTip text="Price of 1 $SHELL">
                <img style={{ maxHeight: "1rem", marginBottom: "-0.1rem" }} src={ShellIcon} />
              </IconTip>{" "}
              = $ {price.shell}
            </span>
          </div>

          <div className="flex lg:mt-0 px-4 py-2 mr-2 rounded-xl shadow bg-gray-600 my-2 justify-center bg-opacity-80">
            <Link
              to="/saferoom/clam"
              className="flex"
              style={
                location.pathname.indexOf("saferoom") === -1
                  ? null
                  : { pointerEvents: "none" }
              }
            >
              <span className="p-1 text-sm text-gray-200 font-bold font-sans">
                Safe: {clamBalance}{" "}
                <IconTip text="Clams owned">
                  <img
                    style={{ maxHeight: "1rem", marginBottom: "-0.1rem" }}
                    src={ClamIcon}
                  />
                </IconTip>{" "}
                | {pearlBalance}{" "}
                <IconTip text="Pearls owned">
                  <img
                    style={{ maxHeight: "1rem", marginBottom: "-0.1rem" }}
                    src={PearlIcon}
                  />{" "}
                </IconTip>{" "}
                {location.pathname.indexOf("saferoom") === -1 && (
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
                )}
              </span>
            </Link>
          </div>
          <div className="flex lg:mt-0 px-4 py-2 mr-2 rounded-xl shadow bg-gray-600 my-2 justify-center bg-opacity-80">
            <Link
              to="/farms"
              className="flex"
              style={
                location.pathname.indexOf("farms") === -1 ? null : { pointerEvents: "none" }
              }
            >
              <span className="p-1 text-sm text-gray-200 font-bold font-sans">
                Farm: {clamBalanceInFarm}{" "}
                <IconTip text="Clams deposited">
                  <img
                    style={{ maxHeight: "1rem", marginBottom: "-0.1rem" }}
                    src={ClamIcon}
                  />
                </IconTip>{" "}
                | {pearlBalanceInFarm}{" "}
                <IconTip text="Pearls for collection">
                  <img
                    style={{ maxHeight: "1rem", marginBottom: "-0.1rem" }}
                    src={PearlIcon}
                  />
                </IconTip>
                {location.pathname.indexOf("farms") === -1 && (
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
                )}
              </span>
            </Link>
          </div>
          <NavBarUserProfile account={address} className="mt-2" disconnect={onDisconnect} />
        </>
      )}
          {/* </div>
        </div>
      </nav> */}
    </>
  );
};
// just send everything
const mapToProps = (redux) => redux;
export default connect(mapToProps, actions)(Navbar);
