require('dotenv').config();

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const TRANSACTION_HASH = process.argv[2];

web3.eth.getTransaction(TRANSACTION_HASH, (error, tx) => {
  const tx_input = '0x' + tx.input.slice(10);
  const params = web3.eth.abi.decodeParameters(['uint256', 'string'], tx_input);

  console.log("Transaction:");
  console.log(tx);

  console.log("Transaction parameters:");
  console.log(params);
});
