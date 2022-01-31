# NFT Service
Service used for running admin transactions on the blockchain. Contains contract minter's private keys (you can use the owner's private key for development).

## Requirements
1. Docker
2. docker-compose

## Setup
* `docker build -t nft-service .`

# Running in isolation
* `docker-compose up nft-service`

## Running examples
Start the service and:
* `./scripts/mint_nft.sh`
