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

const TRANFORMATION_ID = 5;
const IMAGE_URL = "https://images.unsplash.com/photo-1522767131594-6b7e96848fba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJlYXV0aWZ1bCUyMGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

async function payGenerating(contract, address, transformationId, imageUrl) {
  const message = await contract.methods
    .payGenerating(transformationId, imageUrl)
    .send({from: address, gas: 500000});

  console.log(message);
}

payGenerating(nftContract, PUBLIC_KEY, TRANFORMATION_ID, IMAGE_URL);
