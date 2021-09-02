const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { BN, expectEvent, expectRevert, time } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleNFT");

describe("StyleNFT", () => {
  const [ owner, user1, user2 ] = accounts;
  const price = web3.utils.toWei("1", "ether");
  const transformationId = new BN("1");

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
    await this.contract.addTransformation("blur", price, {from: owner});
  });

  describe("payGenerating", () => {
    it("Transfers coins to admin address", async () => {
      const value = web3.utils.toWei("1", "ether");
      const oldBalance = await web3.eth.getBalance(owner)

      await this.contract.contract.methods
        .payGenerating(1, "imageUrl")
        .send({from: user1, gas: 500000, value});

      const newBalance = await web3.eth.getBalance(owner)
      expect(newBalance - oldBalance).to.equal(parseInt(value));
    });

    it("Reverts for non existing transformations", async () => {
      const value = web3.utils.toWei("1", "ether");

      await expectRevert(
        this.contract.contract.methods
          .payGenerating(2, "imageUrl")
          .send({from: user1, gas: 500000, value}),
        "Transformation doesn't exist"
      );
    });

    it("Reverts when value doesn't match transformations price", async () => {
      const value = web3.utils.toWei("50000", "wei");

      await expectRevert(
        this.contract.contract.methods
          .payGenerating(1, "imageUrl")
          .send({from: user1, gas: 500000, value}),
        "Transformation value must match transformation price"
      );
    });

    it("Emits ImageGenerationPaid event", async () => {
      const value = web3.utils.toWei("1", "ether");
      const imageURL = "imageURL"

      const tx = await this.contract.contract.methods
        .payGenerating(transformationId, imageURL)
        .send({from: user1, gas: 500000, value});

      expectEvent(
        tx,
        "ImageGenerationPaid",
        {sender: user1, value, transformationId, imageURL}
      );
    });
  });
});
