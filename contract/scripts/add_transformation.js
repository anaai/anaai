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

async function addTransformation(contract, address, name, desc, price, supply) {
  const message = await contract.methods.addTransformation(name, desc, price, supply)
                                        .send({from: address, gas: 500000});
  console.log(message)
}

asciiDesc = "Text art, also called ASCII art or keyboard art is a copy-pasteable digital age art form. It's about making text pictures with text symbols.";
sketchDesc = "A sketch is a rapidly executed freehand drawing that is not usually intended as a finished work.";
candyDesc = "Style transfer is the task of changing the style of an image in one domain to the style of an image in another domain.";
feathersDesc = "Style transfer is the task of changing the style of an image in one domain to the style of an image in another domain.";
mosaicDesc = "Style transfer is the task of changing the style of an image in one domain to the style of an image in another domain.";
theScreamDesc = "Style transfer is the task of changing the style of an image in one domain to the style of an image in another domain.";
udnieDesc = "Style transfer is the task of changing the style of an image in one domain to the style of an image in another domain.";

(async () => {
  await addTransformation(nftContract, PUBLIC_KEY, "ascii", asciiDesc, 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "sketch", sketchDesc, 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "candy", candyDesc, 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "feathers", feathersDesc, 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "mosaic", mosaicDesc, 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "theScream", theScreamDesc, 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "udnie", udnieDesc, 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "celebaDistill", udnieDesc, 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "facePaint", udnieDesc, 0, 300);
  await addTransformation(nftContract, PUBLIC_KEY, "paprika", udnieDesc, 0, 300);
})();
