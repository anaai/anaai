const fs = require('fs');

const replace = require("replace");

const PATHS = [
  ".env",
  "../event-listener/.env",
  "../nft-service/.env"
];
const CLIENT_PATHS = [
  "../client/.env.development",
  "../client/.env.production"
];

const CONTRACT_ABI_PATHS = [
  "../event-listener/StyleNFT.json",
  "../nft-service/contracts/StyleNFT.json",
  "../client/src/assets/contracts/StyleNFT.json"
];

const CONTRACT_ABI_PATH = "artifacts/contracts/StyleNFT.sol/StyleNFT.json";

const CONTRACT_ADDRESS = process.argv[2];

console.log(`Copying contract address ${CONTRACT_ADDRESS} to ${PATHS}`);
replace({
  regex: 'CONTRACT_ADDRESS = \"[a-zA-Z0-9]+\"',
  replacement: `CONTRACT_ADDRESS = "${CONTRACT_ADDRESS}"`,
  paths: PATHS,
  recursive: false,
  silent: false,
});

console.log(`Copying contract address ${CONTRACT_ADDRESS} to ${CLIENT_PATHS}`);
replace({
  regex: 'CONTRACT_ADDRESS=[a-zA-Z0-9]+',
  replacement: `CONTRACT_ADDRESS=${CONTRACT_ADDRESS}`,
  paths: CLIENT_PATHS,
  recursive: false,
  silent: false,
});

console.log(`Copying contract abi from ${CONTRACT_ABI_PATH} to ${CONTRACT_ABI_PATHS}`);
CONTRACT_ABI_PATHS.forEach(path => {
  fs.copyFile(CONTRACT_ABI_PATH, path, (err) => {
    if (err) throw err;
    console.log(`Copied contract abi from ${CONTRACT_ABI_PATH} to ${path}`);
  });
});
