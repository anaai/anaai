require("dotenv").config();
const axios = require("axios")
const uuid = require("uuid")

const WS_API_URL = process.env.WS_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CARTOONIFY_URL = process.env.JOB_SERVICE_CARTOONIFY_URL;
const TRANSFER_TOKEN_URL = process.env.NFT_SERVICE_TRANSFER_TOKEN_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(WS_API_URL);

const contract = require("./StyleNFT.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

const triggerJob = async (payer, imageURL, imageName) => {
  const response = await axios.post(
    CARTOONIFY_URL,
    {payer, image_url: imageURL, image_name: imageName}
  );
  const data = await response.data;
  return data;
}

const transferOwnership = async (recipient, price, tokenId) => {
  const response = await axios.post(
    TRANSFER_TOKEN_URL,
    {recipient, price, "token_id": tokenId}
  );
  const data = await response.data;
  return data;
}

nftContract.events.ImageGenerationPaid(async (error, event) => {
  const imageURL = event.returnValues.imageURL;
  const payer = event.returnValues.sender;
  const jobHash = uuid.v4();
  console.log("Sending request", payer, imageURL, jobHash);

  const jobId = await triggerJob(payer, imageURL, `${jobHash}.jpeg`);
  console.log(jobId);
});

nftContract.events.ImagePaid(async (error, event) => {
  const payer = event.returnValues.sender;
  const price = parseFloat(event.returnValues.value);
  const tokenId = parseInt(event.returnValues.tokenId);

  console.log("Sending request", payer, price, tokenId);
  const transfer = await transferOwnership(payer, price, tokenId);
  console.log(transfer)
});
