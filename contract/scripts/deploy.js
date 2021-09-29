async function main() {
  // Grab the contract factory
  const StyleArt = await ethers.getContractFactory("StyleArt");

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await StyleArt.deploy(); // Instance of the contract
  console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
