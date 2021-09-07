const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleNFT");

describe("StyleNFT", () => {
  const [ owner, user1 ] = accounts;
  const price = web3.utils.toWei("1", "ether");
  const uri = "token1URI";

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
  });

  describe("mintNFT", () => {
    it("Mints an NFT when you are the owner", async () => {
      const oldSupply = await this.contract.totalSupply();
      const oldBalance = await this.contract.balanceOf(owner);

      await this.contract.mintNFT(owner, user1, uri, price, {from: owner});

      const tokenOwner = await this.contract.ownerOf(1);
      const tokenURI = await this.contract.tokenURI(1);

      const newSupply = await this.contract.totalSupply();
      const newBalance = await this.contract.balanceOf(owner);

      expect(oldSupply.toNumber()).to.equal(0);
      expect(newSupply.toNumber()).to.equal(1);

      expect(oldBalance.toNumber()).to.equal(0);
      expect(newBalance.toNumber()).to.equal(1);

      expect(tokenOwner).to.equal(owner);
      expect(tokenURI).to.equal(uri);
    });

    it("Emits TokenMinted event", async () => {
      const tokenId = new BN("1");

      const tx = await this.contract.mintNFT(owner, user1, uri, price, {from: owner});

      expectEvent(
        tx,
        "TokenMinted",
        {recipient: owner, payer: user1, tokenId, tokenURI: uri, price}
      );
    });

    it("Doesn't mint a token when you are not the owner", async () => {
      await expectRevert(
        this.contract.mintNFT(user1, user1, uri, price, {from: user1}),
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("updateTokenPrice", () => {
    it("Changes the price of the token", async () => {
      const tokenId = new BN("1");
      const newPrice = web3.utils.toWei("2", "ether");

      await this.contract.mintNFT(owner, user1, uri, price, {from: owner});
      await this.contract.updateTokenPrice(tokenId, newPrice, {from: owner});

      await expectRevert(
        this.contract.payImage(tokenId, {from: user1, value: price}),
        "Transaction value must match nft price"
      );

      tx = await this.contract.contract.methods
        .payImage(tokenId)
        .send({from: user1, value: newPrice, gas: 500000});

      expect(tx.status).to.equal(true);
    });

    it("Reverts when token doesn't exist", async () => {
      const tokenId = new BN("1");

      await expectRevert(
        this.contract.updateTokenPrice(tokenId, price, {from: owner}),
        "Token does not exist"
      );
    });

    it("Reverts when token is already bought", async () => {
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, uri, price, {from: owner});
      await this.contract.payImage(tokenId, {from: user1, value: price});

      await expectRevert(
        this.contract.updateTokenPrice(tokenId, price, {from: owner}),
        "Token already bought"
      );
    });
  });
});
