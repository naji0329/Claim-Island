import React, { useState, useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";
import { Skeleton } from "@pancakeswap-libs/uikit";

import { Modal } from "components/Modal";
import { getPearlById } from "web3/shared";
import { formatOwnerAddress } from "utils/formatOwnerAddress";
import { ownerOfPearl } from "web3/pearl";

import { InspectorControls } from "./InspectorControls";
import PearlView from "./PearlView";

export const PearlInspect = (props) => {
  const [pearl, setPearl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { tokenId } = useParams();
  const parsedTokenId = Number(tokenId);
  const history = useHistory();

  const handleModalClose = () => {
    history.push("/saferoom/pearl");
  };

  useEffect(() => {
    if (parsedTokenId >= 0) {
      const getPearl = async () => {
        setIsLoading(true);
        const [{ value: pearl }, owner] = await Promise.allSettled([
          getPearlById(parsedTokenId),
          ownerOfPearl(parsedTokenId),
        ]);
        pearl.owner = formatOwnerAddress(owner.value, props.address);
        pearl.ownerAddress = owner.value;
        setPearl(pearl);
        setIsLoading(false);
      };

      getPearl();
    } else {
      setPearl(null);
    }
  }, [tokenId]);

  return (
    <Modal
      isShowing={true}
      title={<InspectorControls tokenId={parseInt(tokenId)} view="pearl" />}
      onClose={handleModalClose}
    >
      {isLoading ? (
        <Skeleton animation="waves" variant="rect" height={200} />
      ) : pearl && pearl.pearlDataValues.birthTime !== "0" ? (
        <PearlView {...props} {...pearl} view="inspector" />
      ) : (
        <div className="hero h-[200px]">
          <div className="hero-overlay  bg-opacity-10" />
          <div className="text-center hero-content text-gray-600">
            <div className="max-w-md">
              <h1 className="mb-5 text-xl font-bold">
                {pearl ? "A Pearl with that ID# does not exist." : "Enter Pearl ID# above to inspect the Pearl."}
              </h1>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
