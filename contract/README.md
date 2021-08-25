# Style NFT Contract
## Setup
`npm install`

## Compiling contract
`npx hardhat compile`

## Running tests
1. Copy the contract artifact to `build/contracts` (only after compiling the
   contract)
2. `npm test`

## Deploying contract
`npx hardhat run scripts/deploy.js --network NETWORK`

To deploy to test network, run:
`npx hardhat run scripts/deploy.js --network ropsten`

## Ethereum API platform
[Alchemy](https://dashboard.alchemyapi.io/)

## Storage used for NFT assets
[Pinata](https://pinata.cloud/)

## Good resources
[Minting an
NFT](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft#step-4-add-ether-from-a-faucet)
[ERC721 Standard](https://eips.ethereum.org/EIPS/eip-721#simple-summary)
[Testing smart
contracts](https://docs.openzeppelin.com/learn/writing-automated-tests)
[Test environment](https://docs.openzeppelin.com/test-environment/0.1/api)
