# Event Listener
Event listener listens for events on the blockchain [node provider](https://www.alchemy.com/)
through their web socket API and posts a request to start generating an image to
job service.

### Requirements
1. Docker
2. docker-compose

### Setup
* `docker build -t event-listener .`

## Running in isolation
* `docker-compose up event-listener`

## See event listener in action
Start the service and:
* `cd ../contract` - go to contract directory
* `node scripts/pay_generating.js`
    * this will send a transaction and you can see how event listener reacts to
        it
    * Make sure to listen to the same contract address as your are sending
        transactions to
