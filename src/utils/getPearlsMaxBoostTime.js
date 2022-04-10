import moment from "moment";

import { pearlBoostOrder } from "constants/ui/pearls";

export const getPearlsMaxBoostTime = ({
  shape,
  colour,
  currentBoostShape,
  currentBoostColour,
  period,
  startOfWeek,
}) => {
  if (
    !currentBoostShape ||
    !currentBoostColour ||
    (shape === currentBoostShape && colour === currentBoostColour)
  ) {
    return 0;
  }

  const pearlTrait = `${shape} ${colour}`;
  const boostPearlTrait = `${currentBoostShape} ${currentBoostColour}`;
  const pearlOrderIndex = pearlBoostOrder.findIndex((trait) => trait === pearlTrait);
  const boostPearlOrderIndex = pearlBoostOrder.findIndex((trait) => trait === boostPearlTrait);
  let traitsDiff;
  if (pearlOrderIndex > boostPearlOrderIndex) {
    traitsDiff = pearlOrderIndex - boostPearlOrderIndex - 1;
  } else {
    traitsDiff = pearlBoostOrder.length - boostPearlOrderIndex + pearlOrderIndex - 1;
  }
  const startOfWeekMs = +startOfWeek * 1000;
  const nextWeek = moment(startOfWeekMs).add(period, "s");
  const remainingMs = nextWeek.diff(moment()) + traitsDiff * period * 1000;

  return remainingMs >= 0 ? remainingMs : 0;
};
