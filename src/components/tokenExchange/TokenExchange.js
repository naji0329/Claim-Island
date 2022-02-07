import React, { useState } from "react";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

import { Modal, useModal } from "components/Modal";

import { Onramper } from "./Onramper";
import { Exchange } from "./exchange-tab";
import "./tokenExchange.css";

const TABS = {
  buy: "buy",
  exchange: "exchange",
};

export const TokenExchange = () => {
  const { isShowing, toggleModal } = useModal();
  const [selectedTab, setSelectedTab] = useState(TABS.buy);
  const isBuy = selectedTab === TABS.buy;
  const isExchange = selectedTab === TABS.exchange;

  return (
    <>
      <button className="btn btn-secondary drop-shadow-button" onClick={toggleModal}>
        TOKEN EXCHANGE&nbsp;
        <FontAwesomeIcon icon={faExchangeAlt} className="ml-1" />
      </button>
      <Modal
        isShowing={isShowing}
        onClose={toggleModal}
        width={"35rem"}
        modalClassName="overflow-y-auto"
      >
        <div className="flex flex-col items-center ">
          <div className="tabs">
            <a
              className={cn("tab tab-bordered font-aristotelica-bold text-xl", {
                "tab-active": isBuy,
              })}
              onClick={() => setSelectedTab(TABS.buy)}
            >
              Buy BNB
            </a>
            <a
              className={cn("tab tab-bordered font-aristotelica-bold text-xl", {
                "tab-active": isExchange,
              })}
              onClick={() => setSelectedTab(TABS.exchange)}
            >
              EXCHANGE
            </a>
          </div>
          <div className="exchange-tabs-content mt-4">
            {isBuy && <Onramper />}
            {isExchange && <Exchange />}
          </div>
        </div>
      </Modal>
    </>
  );
};
