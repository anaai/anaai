require('dotenv').config();

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/StyleNFT.sol/StyleNFT.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);
const folapAddress = "0x7b245f044456183BF4949dC1aff2ae9d3691edfF"

const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

async function ownerOf(contract, tokenId) {
  const message = await contract.methods.ownerOf(tokenId).call();
  console.log("Owner of token is: " + message);
}

async function balanceOf(contract, address) {
  const message = await contract.methods.balanceOf(address).call();
  console.log(`Balance of ${address} is ${message}`);
}

async function transfer(contract, sender, reciever, tokenId) {
  const message = await contract.methods.safeTransferFrom(sender, reciever, tokenId)
                                        .send({from: sender, gas: 500000});
  console.log(message);
}

async function tokenURI(contract, tokenId) {
  const message = await contract.methods.tokenURI(tokenId).call();
  console.log(`URI of token ${tokenId}: ${message}`);
}

ownerOf(nftContract, 1)
balanceOf(nftContract, PUBLIC_KEY);
balanceOf(nftContract, folapAddress);
tokenURI(nftContract, 1)
// transfer(nftContract, PUBLIC_KEY, folapAddress, 2)

console.log(`Contract address: ${CONTRACT_ADDRESS}`);
console.log(`Account address: ${PUBLIC_KEY}`);
