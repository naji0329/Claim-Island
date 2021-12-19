import React, { useState, useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";
import { Skeleton } from "@pancakeswap-libs/uikit";

import { Modal } from "components/Modal";
import { getClamById } from "web3/shared";
import clamContract from "web3/clam";
import { formatOwnerAddress } from "utils/formatOwnerAddress";

import { InspectorControls } from "./InspectorControls";
import ClamView from "./ClamView";

export const ClamInspect = (props) => {
  const [clam, setClam] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { tokenId } = useParams();
  const history = useHistory();

  const handleModalClose = () => {
    history.push("/saferoom/clam");
  };

  useEffect(() => {
    const parsedTokenId = Number(tokenId);
    if (parsedTokenId >= 0) {
      const getClam = async () => {
        setIsLoading(true);
        const [{ value: clam }, owner] = await Promise.allSettled([
          getClamById({
            tokenId: parsedTokenId,
            clamContract,
          }),
          clamContract.ownerOfClam(parsedTokenId),
        ]);
        clam.owner = formatOwnerAddress(owner.value, props.address);
        clam.ownerAddress = owner.value;
        setClam(clam);
        setIsLoading(false);
      };

      getClam();
    } else {
      setClam(null);
    }
  }, [tokenId]);

  return (
    <Modal
      isShowing={true}
      title={<InspectorControls tokenId={parseInt(tokenId)} view="clam" />}
      onClose={handleModalClose}
    >
      {isLoading ? (
        <Skeleton animation="waves" variant="rect" height={200} />
      ) : clam && clam.clamDataValues.birthTime !== "0" ? (
        <ClamView {...props} {...clam} view="inspector" />
      ) : (
        <div className="hero h-[200px]">
          <div className="hero-overlay bg-opacity-10" />
          <div className="text-center hero-content text-gray-600">
            <div className="max-w-md">
              <h1 className="mb-5 text-xl font-bold">
                {clam ? "A Clam with that ID# does not exist." : "Enter Clam ID# above to inspect the Clam."}
              </h1>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
