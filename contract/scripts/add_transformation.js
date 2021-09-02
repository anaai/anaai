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

async function addTransformation(contract, address, name, price) {
  const message = await contract.methods.addTransformation(name, price)
                                        .send({from: address, gas: 500000});
  console.log(message)
}

addTransformation(nftContract, PUBLIC_KEY, "cartoonification", 0);
