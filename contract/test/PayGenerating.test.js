const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleArt");

describe("StyleArt", () => {
  const [ owner, user1 ] = accounts;
  const price = web3.utils.toWei("1", "ether");
  const supply = new BN("1");
  const transformationId = new BN("1");
  const transformationNumber = new BN("1");
  const params = web3.utils.asciiToHex('{"image_url": "http://image.com"}');

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
    await this.contract.addTransformation("blur", price, supply, {from: owner});
  });

  describe("payGenerating", () => {
    it("Transfers coins to admin address", async () => {
      const value = web3.utils.toWei("1", "ether");
      const oldBalance = await web3.eth.getBalance(owner)

      await this.contract.contract.methods
        .payGenerating(1, params)
        .send({from: user1, gas: 500000, value});

      const newBalance = await web3.eth.getBalance(owner)
      expect(newBalance - oldBalance).to.equal(parseInt(value));
    });

    it("Reverts for non existing transformations", async () => {
      const value = web3.utils.toWei("1", "ether");

      await expectRevert(
        this.contract.contract.methods
          .payGenerating(2, params)
          .send({from: user1, gas: 500000, value}),
        "Requested transformation doesn't exist"
      );
    });

    it("Reverts when value doesn't match transformations price", async () => {
      const value = web3.utils.toWei("50000", "wei");

      await expectRevert(
        this.contract.contract.methods
          .payGenerating(1, params)
          .send({from: user1, gas: 500000, value}),
        "Transaction value must match transformation price"
      );
    });

    it("It reverts when transformation supply is exhausted", async () => {
      const value = web3.utils.toWei("1", "ether");
      const params2 = web3.utils.asciiToHex('{"image_url": "http://image2.com"}');

      await this.contract.contract.methods
        .payGenerating(1, params)
        .send({from: user1, gas: 500000, value}),

      await expectRevert(
        this.contract.contract.methods
          .payGenerating(1, params2)
          .send({from: user1, gas: 500000, value}),
        "Transformation supply is exhausted"
      );
    });

    it("Emits ImageGenerationPaid event", async () => {
      const value = web3.utils.toWei("1", "ether");

      const tx = await this.contract.contract.methods
        .payGenerating(transformationId, params)
        .send({from: user1, gas: 500000, value});

      expectEvent(
        tx,
        "ImageGenerationPaid",
        {sender: user1, value, transformationId, transformationNumber, params}
      );
    });

    it("Emits params bytes that are convertible to original json", async () => {
      const value = web3.utils.toWei("1", "ether");

      const tx = await this.contract.contract.methods
        .payGenerating(transformationId, params)
        .send({from: user1, gas: 500000, value});

      expectEvent(
        tx,
        "ImageGenerationPaid",
        {sender: user1, value, transformationId, transformationNumber, params}
      );

      const decodedParams = '{"image_url": "http://image.com"}';
      expect(web3.utils.hexToAscii(params)).to.equal(decodedParams);
    });
  });
});
