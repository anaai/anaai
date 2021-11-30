require('dotenv').config();

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const Web3 = require("web3");
const web3 = createAlchemyWeb3(API_URL);

const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const contract = require("../artifacts/contracts/StyleArt.sol/StyleArt.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

const MINTER_KEY = "0xB74EA7Ea3a5C6fa570b966c17fFBC80ECf70f694"

async function addMinter(contract, address, minter) {
  const message = await contract.methods.addMinter(minter)
                                        .send({from: address, gas: 5000000});
  console.log(message)
}

addMinter(nftContract, PUBLIC_KEY, MINTER_KEY);
