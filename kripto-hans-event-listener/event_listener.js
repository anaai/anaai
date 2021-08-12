require("dotenv").config();
require("axios")

const WS_API_URL = process.env.WS_API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(WS_API_URL);

const contract = require("./StyleNFT.json");
const contractAddress = "0x69aCA7BcEED801f6B331962c3FF4659C0d52Fa13";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const triggerJob = async jobRequestId => {
  const response = await axios.post("url", {jobRequestId});
  const data = await response.json();
}

nftContract.events.Transfer(function(error, event) {console.log(event)});
nftContract.events.TokenMinted(function(error, event) {
  await triggerJob(event.Result);
});
