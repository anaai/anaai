const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleArt");

describe("StyleArt", () => {
  const [ owner, user1 ] = accounts;

  const name = "Transformation 1";
  const description = "Very cool transformation";
  const price = 3;
  const supply = 10;

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

      await this.contract.addTransformation(name,
                                            description,
                                            price,
                                            supply,
                                            {from: owner});
      const transformations = await this.contract.listTransformations();

      expect(transformations.length).to.equal(1);
      expect(transformations[0].id).to.equal("1");
      expect(transformations[0].name).to.equal(name);
      expect(transformations[0].description).to.equal(description);
      expect(transformations[0].price).to.equal(price.toString());
      expect(transformations[0].supply).to.equal(supply.toString());
    });

    it("Creates a transformation", async () => {
      await this.contract.addTransformation(name, description, price, supply, {from: owner});
      const transformations = await this.contract.listTransformations();

      expect(transformations.length).to.equal(1);
      expect(transformations[0].id).to.equal("1");
      expect(transformations[0].name).to.equal(name);
      expect(transformations[0].description).to.equal(description);
      expect(transformations[0].price).to.equal(price.toString());
      expect(transformations[0].supply).to.equal(supply.toString());
    });

    it("Reverts transformation creation when caller is not admin", async () => {
      await expectRevert(
        this.contract.addTransformation("name", "desc", 1, 10, {from: user1}),
        "Ownable: caller is not the owner"
      );
    });

    it("Updates transformation price", async () => {
      const newPrice = 4;

      await this.contract.addTransformation(name, description, price, supply, {from: owner});
      let transformations = await this.contract.listTransformations();
      expect(transformations[0].price).to.equal(price.toString());

      await this.contract.updateTransformationPrice(1, newPrice, {from: owner});
      transformations = await this.contract.listTransformations();
      expect(transformations[0].price).to.equal(newPrice.toString());
    });

    it("Reverts transformation update when caller is not admin", async () => {
      await this.contract.addTransformation("name", "desc", 4, 10, {from: owner});

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
