import { useState, useEffect } from "react";
import { useAsync } from "react-use";
import { connect } from "redux-zero/react";
import { actions } from "../../store/redux";
import { getAllPools } from "web3/bank";
import { ClamItem, clamItemAction } from "./ClamItem";
import { ClamsSorting } from "components/clamsSorting";
import { getSortedClams } from "utils/clamsSort";

const ClamDeposit = ({
  clams: unsortedClams,
  updateCharacter,
  dispatchFetchAccountAssets,
  updateAccount,
  account: { address },
  setRefreshClams,
  sorting: {
    farmDepositingModal: { clams: clamsSortOrder },
  },
}) => {
  const [clams, setClams] = useState([]);
  const request = useAsync(async () => {
    const pools = await getAllPools({ address });
    return pools;
  });

  useEffect(() => {
    const { order, value } = clamsSortOrder;
    const sortedClams = getSortedClams(unsortedClams, value, order);
    setClams(sortedClams);
  }, [unsortedClams, clamsSortOrder.order, clamsSortOrder.value]);

  return (
    <div className="ClamDeposit p-2">
      {request.loading ? (
        <div> Loading... </div>
      ) : (
        <>
          {clams.length ? (
            <>
              <div className="flex flex-row justify-center text-center gap-6 mb-3">
                <h1 className="text-gray-600 font-aristotelica-bold text-3xl pt-3">Choose a Clam</h1>
                <ClamsSorting page="farmDepositingModal" textSize="sm" />
              </div>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-2 max-h-160 overflow-y-auto pt-3">
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
            </>
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
