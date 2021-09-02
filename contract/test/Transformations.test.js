const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleNFT");

describe("StyleNFT", () => {
  const [ owner, user1 ] = accounts;

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
  });

  describe("Transformations", () => {
    it("Returns an empty array of transformations", async () => {
      const transformations = await this.contract.listTransformations();
      expect(transformations).to.deep.equal([]);
    });

    it("Returns all transformations", async () => {
      const name = "Transformation 1";
      const price = 3;

      await this.contract.addTransformation(name, price, {from: owner});
      const transformations = await this.contract.listTransformations();

      expect(transformations.length).to.equal(1);
      expect(transformations[0].id).to.equal("1");
      expect(transformations[0].name).to.equal(name);
      expect(transformations[0].price).to.equal(price.toString());
    });

    it("Creates a transformation", async () => {
      const name = "Transformation 1";
      const price = 3;

      await this.contract.addTransformation(name, price, {from: owner});
      const transformations = await this.contract.listTransformations();

      expect(transformations.length).to.equal(1);
      expect(transformations[0].id).to.equal("1");
    });

    it("Reverts transformation creation when caller is not admin", async () => {
      await expectRevert(
        this.contract.addTransformation("name", 1, {from: user1}),
        "Ownable: caller is not the owner"
      );
    });

    it("Updates transformation price", async () => {
      const name = "Transformation 1";
      const price = 3;
      const newPrice = 4;

      await this.contract.addTransformation(name, price, {from: owner});
      let transformations = await this.contract.listTransformations();
      expect(transformations[0].price).to.equal(price.toString());

      await this.contract.updateTransformationPrice(1, newPrice, {from: owner});
      transformations = await this.contract.listTransformations();
      expect(transformations[0].price).to.equal(newPrice.toString());
    });

    it("Reverts transformation update when caller is not admin", async () => {
      await this.contract.addTransformation("name", 4, {from: owner});

      await expectRevert(
        this.contract.updateTransformationPrice(1, 5, {from: user1}),
        "Ownable: caller is not the owner",
      );
    });

    it("Doesn't update non existing transformations", async () => {
      await this.contract.updateTransformationPrice(1, 5, {from: owner}),
      transformations = await this.contract.listTransformations();
      expect(transformations.length).to.equal(0);
    });
  });
});
