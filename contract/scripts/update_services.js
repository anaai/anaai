const replace = require("replace");

PATHS = [
  ".env",
  "../event-listener/.env",
  "../nft-service/.env"
]
CLIENT_PATHS = [
  "../client/.env.development",
  "../client/.env.production"
]

const CONTRACT_ADDRESS = process.argv[2]

replace({
  regex: 'CONTRACT_ADDRESS = \"[a-zA-Z0-9]+\"',
  replacement: `CONTRACT_ADDRESS = "${CONTRACT_ADDRESS}"`,
  paths: PATHS,
  recursive: false,
  silent: false,
});

replace({
  regex: 'CONTRACT_ADDRESS=[a-zA-Z0-9]+',
  replacement: `CONTRACT_ADDRESS=${CONTRACT_ADDRESS}`,
  paths: CLIENT_PATHS,
  recursive: false,
  silent: false,
});
