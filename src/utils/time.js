import moment from "moment";

export const secondsToFormattedTime = (timeinSeconds) => {
  const seconds = Math.floor(Number(timeinSeconds));

  if (seconds <= 0) {
    return "";
  }

  const dDisplay = Math.floor(seconds / (24 * 60 * 60)) + "d, ";
  const hhmmssDisplay = new Date(timeinSeconds * 1000).toISOString().substr(11, 8);

  return dDisplay + hhmmssDisplay;
};

export const formatMsToDuration = (remainingMs) => {
  const days = Math.floor(moment.duration(remainingMs).asDays());
  const hours = moment.duration(remainingMs).hours();
  const minutes = moment.duration(remainingMs).minutes();
  const seconds = moment.duration(remainingMs).seconds();

  const paddedHours = hours > 9 ? hours : `0${hours}`;
  const paddedMinutes = minutes > 9 ? minutes : `0${minutes}`;
  const paddedSeconds = seconds > 9 ? seconds : `0${seconds}`;

  const duration =
    days > 0
      ? `${days}d ${paddedHours}:${paddedMinutes}:${paddedSeconds}`
      : `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;

  return duration;
};
