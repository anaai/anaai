# Style Art Contract
Contract that defines what data is held on Ethereum and how to interract with
it. Based on the standard [ERC-721](https://eips.ethereum.org/EIPS/eip-721)
standard.

## Setup
`npm install`

## Compiling contract
`npx hardhat compile`

## Running tests
1. Copy the contract artifact (only after compiling the contract)
    * `cp artifacts/contracts/StyleArt.sol/StyleArt.json build/contracts`
2. `npm test`

## Deploying contract
`npx hardhat run scripts/deploy.js --network NETWORK`

## How to setup the contract for use
1. Add transformations
2. Add minters:
    * Minters are addresses that are allowed to mint tokens
    * Useful for securing your owner address (the one you deployed the contract
        with), as you can just rotate minters if compromised
    * Owner can do everything a minter can, and more. So you can skip this part
        during development

To deploy to test network, run:
`npx hardhat run scripts/deploy.js --network rinkeby`

## Examples
Examples on how to interact with the contract can be found in the `scripts`
directory and includes:
1. Basic examples on how to communicate with the node
2. Adding minters
3. Adding transformations
4. Minting token
5. Paying for generating the image
6. Script for updaing all services when you compile a new contract
7. ...

## Requirements
* Ethereum node provider - [Alchemy](https://dashboard.alchemyapi.io/)
* IPFS used for NFTs - [Pinata](https://pinata.cloud/)

## Good resources
[Minting an
NFT](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft#step-4-add-ether-from-a-faucet)
[ERC721 Standard](https://eips.ethereum.org/EIPS/eip-721#simple-summary)
[Testing smart
contracts](https://docs.openzeppelin.com/learn/writing-automated-tests)
[Test environment](https://docs.openzeppelin.com/test-environment/0.1/api)
