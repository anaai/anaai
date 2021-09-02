const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { BN, expectEvent, expectRevert, time } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleNFT");

describe("StyleNFT", () => {
  const [ owner, user1, user2 ] = accounts;
  const price = web3.utils.toWei("1", "ether");

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
  });

  describe("payImage", () => {
    it("Transfers coins to admin address", async () => {
      const value = web3.utils.toWei("1", "ether");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});
      const oldBalance = parseInt(await web3.eth.getBalance(owner));

      await this.contract.contract.methods
        .payImage(tokenId)
        .send({from: user1, gas: 500000, value});

      const newBalance = parseInt(await web3.eth.getBalance(owner))

      // check this out (get gas and gas price from transaction and subtract)
      expect(newBalance - oldBalance).to.be.greaterThan(parseInt(value) * 0.9);
    });

    it("Emits ImagePaid event", async () => {
      const value = web3.utils.toWei("1", "ether");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});

      const tx = await this.contract.contract.methods
        .payImage(tokenId)
        .send({from: user1, gas: 500000, value});

      expectEvent(
        tx,
        "ImagePaid",
        {sender: user1, value, tokenId}
      );
    });

    it("Transfers image when payer pays the image in the first hour", async () => {
      const value = web3.utils.toWei("1", "ether");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});

      tx = await this.contract.contract.methods
        .payImage(tokenId)
        .send({from: user1, gas: 500000, value});

      expect(tx.status).to.equal(true);
    });

    it("Reverts when non payer tries to pay in the first hour", async () => {
      const value = web3.utils.toWei("1", "ether");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});

      await expectRevert(
        this.contract.contract.methods
          .payImage(tokenId)
          .send({from: user2, gas: 500000, value}),
        "Only the person who generated the image can buy it in the first hour"
      );
    });

    it("Transfers image when non payers pays the image after the first hour", async () => {
      const value = web3.utils.toWei("1", "ether");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});
      await time.increase(3600)

      tx = await this.contract.contract.methods
        .payImage(tokenId)
        .send({from: user2, gas: 500000, value});

      // add boolean return value to contract and a view to see what you paid for?
      expect(tx.status).to.equal(true);
    });

    it("Reverts when exact amount of ether is not provided", async () => {
      const value = web3.utils.toWei("500000", "wei");
      const tokenId = new BN("1");
      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});

      await expectRevert(
        this.contract.payImage(tokenId, {from: user1, value}),
        "Transaction value must match nft price",
      );
    });

    it("Reverts when token doesn't exist", async () => {
      const value = web3.utils.toWei("1", "ether");
      const tokenId = new BN("1");

      await expectRevert(
        this.contract.payImage(tokenId, {from: user1, value}),
        "Token does not exist",
      );
    });
  });
});

