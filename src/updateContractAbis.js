const fs = require("fs");

const main = () => {
  const copyFrom = "src/contracts/";
  const copyTo = "src/web3/abi/";
  fs.readdirSync(copyFrom).forEach((fileName) => {
    const contract = fs.readFileSync(copyFrom + fileName, "utf8");
    const abi = JSON.parse(contract).abi;
    fs.writeFileSync(copyTo + fileName, JSON.stringify(abi, null, 2));
  });
};

main();
