# Event Listener
Event listener listens for events on the blockchain through their web socket API
and triggers appropriate actions on the rest of the platform.

1. When users pay for generating an image -> Triggers a job for generating an
   image
2. When users pay for an image -> Calls nft service to transfer token ownership
   to the user who paid for the image

### Requirements
1. Docker
2. docker-compose

### Setup
* `docker build -t event-listener .`

## Running in isolation
* `docker-compose up event-listener`

## See event listener in action
Start the service and:
### Reacting to payGenerating
* `cd contract`
* `node scripts/pay_generating.js` -> to see whether a job will be triggered

### Reacting to payGenerating
* `cd contract`
* `node scripts/pay_image.js` -> to see whether a request will be posted to nft
  service for changing token ownership
