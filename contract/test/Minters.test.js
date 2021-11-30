const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleArt");

describe("StyleArt", () => {
  const [ owner, user1, user2 ] = accounts;
  const uri = "token1URI";

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
  });

  describe("addMinter", () => {
    it("Adds minter when you are the owner", async () => {
      const tx = await this.contract.contract.methods
                  .addMinter(user1)
                  .send({from: owner, gas: 500000});
      expect(tx.status).to.equal(true);
    });

    it("Reverts when non owner tries to add minter", async () => {
      await expectRevert(
        this.contract.contract.methods
          .addMinter(user1)
          .send({from: user2, gas: 500000}),
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("removeMinter", () => {
    it("Removes minter when you are the owner", async () => {
      const tx = await this.contract.contract.methods
                  .addMinter(user1)
                  .send({from: owner, gas: 500000});
      expect(tx.status).to.equal(true);
    });

    it("Reverts when non owner tries to remove minter", async () => {
      await expectRevert(
        this.contract.contract.methods
          .removeMinter(user1)
          .send({from: user2, gas: 500000}),
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("mintNFT", () => {
    it("Mints token when you are the owner", async () => {
      await this.contract.mintNFT(user1, uri, {from: owner});
      const supply = await this.contract.totalSupply();
      expect(supply.toNumber()).to.equal(1);
    });

    it("Mints token when you are an approved minter", async () => {
      await this.contract.contract.methods
        .addMinter(user1)
        .send({from: owner, gas: 500000});
      await this.contract.mintNFT(user2, uri, {from: user1});

      const supply = await this.contract.totalSupply();
      expect(supply.toNumber()).to.equal(1);
    });

    it("Reverts when non approved minter or owner tries to mint", async () => {
      await expectRevert(
        this.contract.contract.methods
          .mintNFT(user1, uri)
          .send({from: user2, gas: 500000}),
        "No permission to mint"
      );
    });
  });
});
