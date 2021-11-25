require('dotenv').config();

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const contract = require("../artifacts/contracts/StyleArt.sol/StyleArt.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);
const folapAddress = "0x7b245f044456183BF4949dC1aff2ae9d3691edfF";

const TRANFORMATION_ID = 3;
const IMAGE_URL = "https://i.pinimg.com/originals/5b/b9/59/5bb95935defd974fa87b44eaa8ed9bcd.jpg";
const PARAMS = web3.utils.asciiToHex(JSON.stringify({image_url: IMAGE_URL}));

async function payGenerating(contract, address, transformationId, params) {
  const message = await contract.methods
    .payGenerating(transformationId, params)
    .send({from: address, gas: 1000000, value: 0});

  console.log(message);
}

payGenerating(nftContract, PUBLIC_KEY, TRANFORMATION_ID, PARAMS);
