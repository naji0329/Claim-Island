import React from "react";
import { shortenAddress } from "@usedapp/core";

import Web3Avatar from "../Web3Avatar";

export const NavBarUserProfile = ({ account, disconnect }) => (
  <div className="dropdown cursor-pointer">
    <div
      tabIndex="0"
      className="flex lg:mt-0 px-4 py-2 bg-gray-900 mr-2 rounded-xl shadow bg-opacity-80"
    >
      <div className="p-1 text-sm text-gray-200">{shortenAddress(account)}</div>
      <Web3Avatar address={account} size={30} />
    </div>
    <ul
      tabIndex="0"
      className="p-2 shadow menu dropdown-content bg-gray-900 bg-opacity-80 rounded-box w-full"
    >
      <li>
        <button className="btn" onClick={disconnect}>
          Disconnect
        </button>
      </li>
    </ul>
  </div>
);
