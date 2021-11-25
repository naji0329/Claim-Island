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
  const days = moment.duration(remainingMs).days();
  const hours = moment.duration(remainingMs).hours();
  const minutes = moment.duration(remainingMs).minutes();
  const seconds = moment.duration(remainingMs).seconds();
  const duration = `${days}d ${hours}:${minutes}:${seconds}`;

  return duration;
};
