import {
  pearlSendToSaferoom,
  pearlGenerateNew,
  pearlNotEnoughGems,
} from "./character/pearlCollection";
import { clamNFTAddress, pearlFarmAddress } from "constants/constants";
import { getBalance, infiniteApproveSpending } from "web3/gem";
import { formatFromWei } from "web3/shared";
import { approveContractForMaxUintErc721 } from "web3/bep20";
import {
  stakeClam,
  stakeClamAgain,
  stakePrice,
  hasClamBeenStakedBeforeByUser,
} from "web3/pearlFarm";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";

export const ifPearlSendSaferoom = async ({ updateCharacter, address, clamId, setInTx }) => {
  const gems = await stakePrice();
  if (setInTx) setInTx(false);
  pearlSendToSaferoom({ updateCharacter }, () => {
    pearlGenerateNew({ updateCharacter, gems: formatFromWei(gems) }, async () => {
      const pricePerPearlInGem = gems;
      const gemBalance = await getBalance(address).then((v) => new BigNumber(v)); // from string to BN
      if (gemBalance.lt(pricePerPearlInGem)) {
        const errorMsg = `You need at least ${formatFromWei(
          pricePerPearlInGem
        )} $GEM to stake Clam`;
        toast.error(errorMsg);
        pearlNotEnoughGems({ updateCharacter });
      } else {
        if (setInTx) setInTx(true);
        await approveContractForMaxUintErc721(clamNFTAddress, pearlFarmAddress);
        await infiniteApproveSpending(address, pearlFarmAddress, pricePerPearlInGem);

        const hasClamBeenStakeByUserBefore = await hasClamBeenStakedBeforeByUser(clamId);
        if (hasClamBeenStakeByUserBefore) {
          await stakeClamAgain(clamId);
        } else {
          await stakeClam(clamId);
        }
        if (setInTx) setInTx(false);
      }
    });
  });
};
