import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

import mobileClamIcon from "assets/img/clam-icon-outline.png";
import mobilePearlsIcon from "assets/img/pearls-icon-outline.png";
import mobileMapIcon from "assets/img/map.png";
import mobileSearchIcon from "assets/img/search.png";

const BottomMenu = ({isShowing, toggleModal, setViewTabF, onDepositClam }) => {

  return (
      <>
      
        <div className="bottom_menu border-t border-blue-700 py-2">
            <div className="menu_item active">
                <Link to="/">
                    <img src={mobileMapIcon} alt="" />
                    <p>Map</p>
                </Link>
            </div>
            <div className="menu_item">
                <Link to="#" onClick={() => { setViewTabF('farms'); if(isShowing) { toggleModal(); } }}>
                    <img src={mobileClamIcon} alt="" />
                    <p>Farming</p>
                </Link>
            </div>
            <div className="menu_item">
                <Link to="#" onClick={() => { setViewTabF('ready_claims'); if(isShowing) { toggleModal();} }}>
                <img src={mobilePearlsIcon} alt="" />
                <p>Ready<br/> Clams</p>
                </Link>
            </div>
            <div className="menu_item">
                <Link to="#" onClick={onDepositClam}>
                    <img src={mobileSearchIcon} alt="" />
                    <p>Deposit<br/> Clams</p>
                </Link>
            </div>
        </div>

      </>
  );
};

export default BottomMenu;