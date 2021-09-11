export const sleep = (s) => {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
};

export const secondsToFormattedTime = (seconds) =>
  seconds > 0 ? new Date(seconds * 1000).toISOString().substr(11, 8) : "00:00:00";
