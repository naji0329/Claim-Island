import moment from "moment";

export const secondsToFormattedTime = (seconds) =>
  seconds > 0 ? new Date(seconds * 1000).toISOString().substr(11, 8) : "00:00:00";

export const formatMsToDuration = (remainingMs) => {
  const days = moment.duration(remainingMs).days();
  const hours = moment.duration(remainingMs).hours();
  const minutes = moment.duration(remainingMs).minutes();
  const seconds = moment.duration(remainingMs).seconds();
  const duration = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

  return duration;
};
