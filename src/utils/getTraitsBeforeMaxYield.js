import { pearlBoostOrder } from "constants/ui/pearls";

export const getTraitsBeforeMaxYield = ({ shape, color, currentBoostShape, currentBoostColour }) => {
  const pearlTrait = `${shape} ${color}`;
  const boostPearlTrait = `${currentBoostShape} ${currentBoostColour}`;
  const pearlOrderIndex = pearlBoostOrder.findIndex((trait) => trait === pearlTrait);
  const boostPearlOrderIndex = pearlBoostOrder.findIndex((trait) => trait === boostPearlTrait);

  if (pearlOrderIndex > boostPearlOrderIndex) {
    return pearlOrderIndex - boostPearlOrderIndex;
  }
  return pearlBoostOrder.length - boostPearlOrderIndex + pearlOrderIndex;
};
