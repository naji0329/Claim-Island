import moment from "moment";

export const secondsToFormattedTime = (seconds) => {
  if (seconds === 0) return "00:00:00";

  const isoTime = new Date(seconds * 1000).toISOString();
  const daysLeft = isoTime.substr(8, 2);
  const ending = daysLeft > 1 ? "s" : "";

  return +daysLeft > 0
    ? `${daysLeft} day${ending} ${isoTime.substr(11, 8)}`
    : isoTime.substr(11, 8);
};

export const formatMsToDuration = (remainingMs) => {
  const days = moment.duration(remainingMs).days();
  const hours = moment.duration(remainingMs).hours();
  const minutes = moment.duration(remainingMs).minutes();
  const seconds = moment.duration(remainingMs).seconds();
  const duration = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

  return duration;
};
