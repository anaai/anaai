require("dotenv").config();
const axios = require("axios")
const uuidv4 = require("uuid/v4")

const WS_API_URL = process.env.WS_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CARTOONIFY_URL = process.env.JOB_SERVICE_CARTOONIFY_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(WS_API_URL);

const contract = require("./StyleNFT.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

const triggerJob = async (imageURL, imageName) => {
  const response = await axios.post(
    CARTOONIFY_URL,
    {image_url: imageURL, image_name: imageName}
  );
  const data = await response.data;
  return data;
}

nftContract.events.ImageGenerationPaid(async (error, event) => {
  const imageURL = event.returnValues.imageURL;
  const uuid = uuidv4();
  console.log("Sending request", imageURL, uuid);

  const jobId = await triggerJob(imageURL, `${uuid}.jpeg`);
  console.log(jobId);
});
