# anaai
[![Build Status](https://vonum.semaphoreci.com/badges/anaai.svg)](https://vonum.semaphoreci.com/projects/anaai)

Platform for generating images using ai and selling them as NFTs on ethereum
blockchain. The idea is to allow users to generate their own art using anaai and
buy NFTs (tokens).
How it is used:
1. Upload an image
2. Send transaction to blockchain to generate an image
3. Image is generated and token is minted
4. User sees the image and can buy token (only the user who paid for the
   transaction can buy in the first hour, after that anyone can buy the token)
5. Token is transfered to user's ownership

## Tokens
Tokens are defined on the blockchain via `id` and `tokenURI`. Token uri links to
the token metadata that is stored anywhere on the internet. The metadata defines
content's url, alongside other information.

## Components
### Contract
Contract defines what data we want to store on the blockchain and how to
manipulate it. It is based on the ERC721 standard.

Possible user transactions are:
1. payGenerating
2. payImage
3. listTransformations
4. All the ERC721 standard public views

Possible admint transactions are
1. mintNFT
2. safeTransferFrom
3. addTransformation
4. listTransformations
5. All the ERC721 standard public views

### NFT service
NFT service is responsible for all admin transactions for our contract:
1. Minting NFTs on the blockchain
2. Transfering token ownership

### Event listener
Event listener listens for events on the [Ethereum blockchain](https://ethereum.org/en/)
and triggers actions on the rest of the platform:
1. When users pay for generating an image -> Triggers a job for generating an
   image
2. When users pay for an image -> Calls nft service to transfer token ownership
   to the user who paid for the image

### Job service
Service responsible for triggering background jobs. Event listeners posts
requests from users and job requests stores these requests in a db and triggers
background jobs.

### Job orchestrator
Task queue used for running background jobs. Implemented using [Celery](https://docs.celeryproject.org/en/stable/getting-started/introduction.html).
Shares db with job service because job requests are linked to these background
tasks.
Redis is used as a messaging queue and postgres is used as the result db.

### Client
Fronted application implemented in [React](https://reactjs.org/).

## Requirements
1. [Metamask](https://metamask.io/) wallet for testing and deploying contracts
2. [Alchemy](https://www.alchemy.com/) for running blockchain nodes and
   interracting via API
3. [Pinata](https://www.pinata.cloud/) for storing images and token metadata
4. Docker and docker-compose

## Setup
1. Deploy contract on Ethereum (or use an existing one)
2. Setup environment variables for services
3. `docker-compose up build`

## Test
### Contract
1. `cd contract`
2. `npm install`
3. `npm test`
### NFT service
1. `cd nft-service`
2. `docker build -t nft-service .`
3. `docker run nft-service python -m pytest tests`
### Event listener
No tests yet
### Job service
1. `cd job-service`
2. `docker build -t job-service .`
3. `docker run job-service python -m pytest tests`
### Job orchestrator
1. `cd job-service`
2. `docker build -t job-orchestrator .`
3. `docker run job-orchestrator python -m pytest tests`
### Client
Not yet runnable through docker:
1. `yarn install`
2. `yarn test`
