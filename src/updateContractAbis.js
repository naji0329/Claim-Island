const fs = require("fs");

const filterContracts = (fileName) => {
  const lowerCaseName = fileName.toLowerCase();

  if (
    lowerCaseName.includes("mock") ||
    lowerCaseName.includes("debugging") ||
    lowerCaseName.includes("deprecated")
  ) {
    return false;
  }

  return true;
};

const main = () => {
  const copyFrom = "src/contracts/";
  const copyTo = "src/web3/abi/";
  fs.readdirSync(copyFrom)
    .filter(filterContracts)
    .forEach((fileName) => {
      const contract = fs.readFileSync(copyFrom + fileName, "utf8");
      const abi = JSON.parse(contract).abi;
      // exclude empty contracts
      if (abi.length) fs.writeFileSync(copyTo + fileName, JSON.stringify(abi, null, 2));
    });
};

main();
