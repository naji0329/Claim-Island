import { useAsync } from "react-use";
import { connect } from "redux-zero/react";
import { actions } from "../../store/redux";
import { getAllPools } from "web3/bank";
import { ClamItem, clamItemAction } from "./ClamItem";

const ClamDeposit = ({
  clams,
  updateCharacter,
  dispatchFetchAccountAssets,
  toggleModal,
  updateAccount,
  account: { address },
  setRefreshClams,
}) => {
  const request = useAsync(async () => {
    const pools = await getAllPools({ address });
    return pools;
  });

  return (
    <div className="ClamDeposit max-h-160 overflow-y-auto p-2">
      {request.loading ? (
        <div> Loading... </div>
      ) : (
        <>
          {clams.length ? (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-2">
              {clams.map((clam) => (
                <ClamItem
                  key={clam.clamId}
                  updateAccount={updateAccount}
                  address={address}
                  {...clam}
                  updateCharacter={updateCharacter}
                  setRefreshClams={setRefreshClams}
                  dispatchFetchAccountAssets={dispatchFetchAccountAssets}
                  action={clamItemAction.DEPOSIT}
                />
              ))}
            </div>
          ) : (
            <div className="w-full bg-white shadow-md rounded-xl text-center text-2xl p-5 text-black">
              You&#39;ve got no more clams available to add to farm
            </div>
          )}
        </>
      )}
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamDeposit);
