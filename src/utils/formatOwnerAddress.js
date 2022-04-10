export const formatOwnerAddress = (ownerAddress, userAddress) => {
  if (!ownerAddress) {
    return "N/A";
  }

  if (ownerAddress === userAddress) {
    return "you";
  }

  return ownerAddress.replace(/^(.{8}).+(.{4})$/, "$1...$2");
};
