async function main() {
  // Grab the contract factory
  const StyleNFT = await ethers.getContractFactory("StyleNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await StyleNFT.deploy(); // Instance of the contract
  console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
