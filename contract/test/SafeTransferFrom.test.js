const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleNFT");

describe("StyleNFT", () => {
  const [ owner, user1 ] = accounts;
  const price = web3.utils.toWei("1", "ether");

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
  });

  describe("safeTransferFrom", () => {
    it("Transfers ownership when you are the owner and the token exists", async () => {
      await this.contract.mintNFT(owner, user1, "token1URI", price, {from: owner});
      const tokenId = new BN("1")

      const oldOwnerBalance = await this.contract.balanceOf(owner);
      const oldRecipientBalance = await this.contract.balanceOf(user1);

      await this.contract.safeTransferFrom(owner, user1, tokenId, {from: owner});

      const newOwnerBalance = await this.contract.balanceOf(owner);
      const newRecipientBalance = await this.contract.balanceOf(user1);

      expect(oldOwnerBalance.toNumber()).to.equal(1);
      expect(oldRecipientBalance.toNumber()).to.equal(0);

      expect(newOwnerBalance.toNumber()).to.equal(0);
      expect(newRecipientBalance.toNumber()).to.equal(1);
    });

    it("Reverts when you are not the owner", async () => {
      await this.contract.mintNFT(owner, user1, "token1URI", price, {from: owner});
      const tokenId = new BN("1")

      await expectRevert(
        this.contract.safeTransferFrom(owner, user1, tokenId, {from: user1}),
        "ERC721: transfer caller is not owner nor approved",
      );
    });

    it("Reverts when the token doesn't exist", async () => {
      const tokenId = new BN("1");

      await expectRevert(
        this.contract.safeTransferFrom(owner, user1, tokenId, {from: user1}),
        "ERC721: operator query for nonexistent token",
      );
    });
  });
});
