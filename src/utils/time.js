export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const secondsToFormattedTime = (seconds) =>
  seconds > 0 ? new Date(seconds * 1000).toISOString().substr(11, 8) : "00:00:00";
