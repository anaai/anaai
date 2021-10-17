require('dotenv').config();

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/StyleArt.sol/StyleArt.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

const BLOCK_NUMBER = process.argv[2];

console.log(`Past events from block ${BLOCK_NUMBER} for contract ${CONTRACT_ADDRESS}`);

nftContract.getPastEvents(
  "ImageGenerationPaid",
  {fromBlock: BLOCK_NUMBER},
  (error, events) => {
    events.forEach(event => {
      console.log(`\nTransaction ${event.transactionHash} in block ${event.blockNumber}`);
      console.log("Data:");
      console.log("Sender", event.returnValues.sender);
      console.log("Value", event.returnValues.value);
      console.log("Transformation id", event.returnValues.transformationId);
      console.log("Transformation number", event.returnValues.transformationNumber);
      console.log("Image URL", event.returnValues.imageURL);
    });
});
