# NFT Service
Service used for running admin transactions on the blockchain. Contains admin
contracts private key.
1. Minting NFTs on the blockchain
2. Transfering token ownership

## Requirements
1. Docker
2. docker-compose

## Setup
* `docker build -t nft-service .`

# Running in isolation
* `docker-compose up nft-service`

## Running examples
Start the service and:
1. `./scripts/mint_nft.sh`
2. `./scripts/transfer_token.sh`
