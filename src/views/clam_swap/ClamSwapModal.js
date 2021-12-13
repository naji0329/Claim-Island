import React from "react";
import { connect } from "redux-zero/react";
import "./index.scss";

import { actions } from "../../store/redux";
import { ClamItem, clamItemAction } from "../farms/ClamItem";

const ClamSwapModal = ({
  account: { address },
  updateCharacter,
  updateAccount,
  dispatchFetchAccountAssets,
  legacyClams,
  toggleModal,
}) => (
  <div className="ClamDeposit max-h-160 overflow-y-auto p-2">
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-2">
      {legacyClams.map((clam) => (
        <ClamItem
          key={clam.clamId}
          updateAccount={updateAccount}
          address={address}
          {...clam}
          updateCharacter={updateCharacter}
          dispatchFetchAccountAssets={dispatchFetchAccountAssets}
          action={clamItemAction.SWAP}
          toggleModal={toggleModal}
        />
      ))}
    </div>
  </div>
);

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamSwapModal);
