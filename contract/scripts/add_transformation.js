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

async function addTransformation(contract, address, name, price, supply) {
  const message = await contract.methods.addTransformation(name, price, supply)
                                        .send({from: address, gas: 5000000});
  console.log(message)
}

const price1 = Web3.utils.toBN("1000000000000000000");
const priceHalf = Web3.utils.toBN("500000000000000000");
const priceFifth = Web3.utils.toBN("200000000000000000");

(async () => {
  await addTransformation(nftContract, PUBLIC_KEY, "ascii", 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "candy", 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "mosaic", 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "theScream", priceHalf, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "udnie", priceHalf, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "celebaDistill", price1, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "facePaint", price1, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "paprika", price1, 300);
})();
