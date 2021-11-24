import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getExplorerAddressLink, ChainId } from "@usedapp/core";
import { connect } from "redux-zero/react";
import "./index.scss";

import Card from "../../components/Card";
import RewardUnknown from "../../assets/img/pearl_unknown.png";

import { claimReward } from "../../web3/communityRewards";
import { communityRewardsAddress } from "../../constants/constants";
import { actions } from "../../store/redux";

const ClaimRewardModal = ({
  account: { address },
  updateCharacter,
  updateAccount,
  communityRewardsData: { userRewards },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const disableButton = Number(userRewards) === 0;

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    setIsLoading(true);

    updateCharacter({
      name: "diego",
      action: "community_rewards.processing.text",
      button: {
        text: undefined,
      },
    });

    await claimReward(address)
      .then(() => {
        setIsLoading(false);
        updateCharacter({
          name: "diego",
          action: "community_rewards.congratsCollection.text",
          button: {
            text: "Ok",
          },
        });
      })
      .catch((e) => {
        setIsLoading(false);
        updateAccount({ error: e.message });
        updateCharacter({
          name: "diego",
          action: "community_rewards.error.text",
          button: {
            text: undefined,
          },
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <div className="flex flex-col mb-4">
            <h2 className="text-blue-700 text-center font-semibold text-3xl mb-2">Get Reward</h2>

            <div className="alert alert-success">
              <div className="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mx-2 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <label>You&apos;ve got {userRewards} rewards to claim</label>
              </div>
            </div>

            {address ? (
              <a
                className="text-gray-500 text-base underline text-center p-2"
                href={getExplorerAddressLink(communityRewardsAddress, ChainId.BSC)}
                target="_blank"
                rel="noreferrer"
              >
                {communityRewardsAddress}
              </a>
            ) : (
              <span className="text-yellow-400 text-center">Wallet not connected</span>
            )}
          </div>

          <div className="flex mb-4 justify-center">
            <img className="w-2/3" src={RewardUnknown} />
          </div>

          <div className="py-2 flex flex-col">
            {disableButton ? (
              <button
                disabled
                type="submit"
                className="disabled cursor-not-allowed block uppercase text-center shadow bg-red-300  focus:shadow-outline focus:outline-none text-white text-xl py-3 px-10 rounded-xl"
              >
                Already Claimed Reward
              </button>
            ) : (
              <>
                {isLoading ? (
                  <button
                    disabled={isLoading}
                    style={{ textAlign: "center" }}
                    type="submit"
                    className="flex justify-center items-center block uppercase text-center shadow bg-yellow-200 text-yellow-600 text-xl py-3 px-10 rounded-xl cursor-not-allowed"
                  >
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-yello-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>{" "}
                    <span>Sending transaction...</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="block uppercase text-center shadow bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white text-xl py-3 px-10 rounded-xl"
                  >
                    Claim Reward
                  </button>
                )}
              </>
            )}
          </div>
        </Card>
      </form>
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClaimRewardModal);
