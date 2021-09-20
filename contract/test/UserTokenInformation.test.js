const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleNFT");

describe("StyleNFT", () => {
  const [ owner, user1 ] = accounts;
  const price = web3.utils.toWei("1", "ether");

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
  });

  describe("payerOf", () => {
    it("Returns the address of the user who payed for generating the image", async () => {
      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});
      const payer = await this.contract.payerOf(new BN("1"));

      expect(payer).to.equal(user1);
    });

    it("Reverts when the token doesn't exist", async () => {
      expectRevert(
        this.contract.payerOf(new BN("1")),
        "Token doesn't exist"
      );
    });
  });

  describe("userGeneratedTokens", () => {
    it("Returns a list of tokens the user paid for generating", async () => {
      await this.contract.mintNFT(owner, user1, "tokenURI1", price, {from: owner});
      await this.contract.mintNFT(owner, user1, "tokenURI2", price, {from: owner});
      const tokens = await this.contract.userGeneratedTokens(user1);

      expect(tokens.length).to.equal(2);
      expect(tokens[0].words[0]).to.equal(1)
      expect(tokens[1].words[0]).to.equal(2)
    });

    it("Reverts when the user didn't generate any tokens", async () => {
      expectRevert(
        this.contract.userGeneratedTokens(owner),
        "User has no generated tokens"
      );
    });
  });
});
