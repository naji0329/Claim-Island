/**
 * Returns is lite version of application enabled
 * @returns {boolean}
 */
export const checkLiteVersion = () => {
  try {
    const isLiteVersion = JSON.parse(localStorage.getItem("isLiteVersion"));

    return isLiteVersion;
  } catch {
    return false;
  }
};
