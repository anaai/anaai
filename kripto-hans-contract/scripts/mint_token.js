require('dotenv').config();

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const contract = require("../artifacts/contracts/StyleNFT.sol/StyleNFT.json");
// const contractAddress = "0x47db177a074a716d1116eb5ef87fd1689ffd57bd";
const contractAddress = "0x69aCA7BcEED801f6B331962c3FF4659C0d52Fa13";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const folapAddress = "0x7b245f044456183BF4949dC1aff2ae9d3691edfF"

async function mintNFT(contract, address, payer, tokenURI, price) {
  const message = await contract.methods.mintNFT(address, payer, tokenURI, price)
                                        .send({from: address, gas: 500000});
  console.log(message)
}

tokenURI = "https://gateway.pinata.cloud/ipfs/QmVM7S9VNc1UG5fJ6QDCrdK8K6Hfaht62i42jzhtVw4HmQ";
mintNFT(nftContract, PUBLIC_KEY, PUBLIC_KEY, tokenURI, 0);
