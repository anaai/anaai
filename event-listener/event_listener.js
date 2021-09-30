require("dotenv").config();
const axios = require("axios")
const uuid = require("uuid")

const WS_API_URL = process.env.WS_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const GENERATE_URL = process.env.JOB_SERVICE_GENERATE_URL;
const TRANSFER_TOKEN_URL = process.env.NFT_SERVICE_TRANSFER_TOKEN_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(WS_API_URL);

const contract = require("./StyleArt.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

const triggerJob = async (payer, transformation, imageURL, imageName, txHash, blockHash) => {
  const response = await axios.post(
    GENERATE_URL, {
      payer,
      transformation,
      image_url: imageURL,
      image_name: imageName,
      transaction_hash: txHash,
      block_hash: blockHash
    }
  );
  const data = await response.data;
  return data;
}

nftContract.events.ImageGenerationPaid(async (error, event) => {
  const imageURL = event.returnValues.imageURL;
  const payer = event.returnValues.sender;
  const transformationId = parseInt(event.returnValues.transformationId);
  const txHash = event.transactionHash;
  const blockHash = event.blockHash;
  const jobHash = uuid.v4();
  console.log(`Recieved transaction ${txHash} in block ${blockHash}`);
  console.log(`${payer} triggered job ${jobHash} for image ${imageURL} with transformation ${transformationId}`);

  await triggerJob(payer, transformationId, imageURL, jobHash, txHash, blockHash);
});
