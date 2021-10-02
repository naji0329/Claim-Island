import moment from "moment";

export const secondsToFormattedTime = (timeinSeconds) => {
  let seconds = Math.floor(Number(timeinSeconds));
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= Math.floor(days * (24 * 60 * 60));
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= Math.floor(hours * (60 * 60));
  const minutes = Math.floor(seconds / 60);
  seconds -= Math.floor(minutes * 60);

  const dDisplay = days + "d, ";
  const hDisplay = hours > 0 ? hours + ":" : "";
  const mDisplay = minutes > 0 ? minutes + ":" : "";
  const sDisplay = seconds > 0 ? seconds : "";

  return dDisplay + hDisplay + mDisplay + sDisplay;
};

export const formatMsToDuration = (remainingMs) => {
  const days = moment.duration(remainingMs).days();
  const hours = moment.duration(remainingMs).hours();
  const minutes = moment.duration(remainingMs).minutes();
  const seconds = moment.duration(remainingMs).seconds();
  const duration = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

  return duration;
};
