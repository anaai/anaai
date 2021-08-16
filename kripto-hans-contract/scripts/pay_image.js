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

const contract = require("../artifacts/contracts/StyleNFT.sol/StyleNFT.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);
const folapAddress = "0x7b245f044456183BF4949dC1aff2ae9d3691edfF";

const IMAGE_URL = "http://prod-upp-image-read.ft.com/6057b8fe-0c1f-11e6-b0f1-61f222853ff3";

async function payImage(contract, address) {
  const message = await contract.methods
    .payImage(1)
    .send({from: address, gas: 500000});

  console.log(message);
}

payImage(nftContract, PUBLIC_KEY);
