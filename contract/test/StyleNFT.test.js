const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { BN, expectEvent, expectRevert, time } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleNFT");

describe("StyleNFT", () => {
  const [ owner, user1, user2 ] = accounts;
  const price = new BN("100000000")

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
  });

  describe("mintNFT", () => {
    it("Mints an NFT when you are the owner", async () => {
      const uri = "token1URI";

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
      const tokenURI = "token1URI";
      const tokenId = new BN("1");

      const tx = await this.contract.mintNFT(owner, user1, tokenURI, price, {from: owner});

      expectEvent(
        tx,
        "TokenMinted",
        {recipient: owner, payer: user1, tokenId, tokenURI, price}
      );
    });

    it("Doesn't mint a token when you are not the owner", async () => {
      await expectRevert(
        this.contract.mintNFT(user1, user1, "token1URI", price, {from: user1}),
        "Ownable: caller is not the owner",
      );
    });
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

  describe("payGenerating", () => {
    it("Transfers coins to admin address", async () => {
      const value = web3.utils.toWei("1", "ether");
      const oldBalance = await web3.eth.getBalance(owner)

      await this.contract.contract.methods
        .payGenerating("imageUrl")
        .send({from: user1, gas: 500000, value});

      const newBalance = await web3.eth.getBalance(owner)

      expect(newBalance - oldBalance).to.equal(parseInt(value));
    });

    it("Emits ImageGenerationPaid event", async () => {
      const value = web3.utils.toWei("1", "ether");
      const imageURL = "imageURL"

      const tx = await this.contract.contract.methods
        .payGenerating(imageURL)
        .send({from: user1, gas: 500000, value});

      expectEvent(
        tx,
        "ImageGenerationPaid",
        {sender: user1, value, imageURL}
      );
    });

    it("Reverts when exact amount of ether is not provided", async () => {
      await expectRevert(
        this.contract.payGenerating("imageURL", {from: user1}),
        "Not enough coins to generate image",
      );
    });
  });

  describe("payImage", () => {
    it("Transfers coins to admin address", async () => {
      const value = web3.utils.toWei("100000000", "wei");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});
      const oldBalance = parseInt(await web3.eth.getBalance(owner));

      await this.contract.contract.methods
        .payImage(tokenId)
        .send({from: user1, gas: 500000, value});

      const newBalance = parseInt(await web3.eth.getBalance(owner))

      // check this out
      expect(newBalance - oldBalance).to.be.greaterThan(parseInt(value) * 0.9);
    });

    it("Emits ImagePaid event", async () => {
      const value = web3.utils.toWei("100000000", "wei");
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
      const value = web3.utils.toWei("100000000", "wei");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});

      tx = await this.contract.contract.methods
        .payImage(tokenId)
        .send({from: user1, gas: 500000, value});

      // add boolean return value to contract and a view to see what you paid for?
      expect(tx.status).to.equal(true);
    });

    it("Transfers image when non payers pays the image after the first hour", async () => {
      const value = web3.utils.toWei("100000000", "wei");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});
      await time.increase(3600)

      tx = await this.contract.contract.methods
        .payImage(tokenId)
        .send({from: user2, gas: 500000, value});

      // add boolean return value to contract and a view to see what you paid for?
      expect(tx.status).to.equal(true);
    });

    it("Reverts when non payer tries to pay in the first hour", async () => {
      const value = web3.utils.toWei("2", "ether");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});

      expectRevert(
        this.contract.contract.methods
          .payImage(tokenId)
          .send({from: user2, gas: 500000, value}),
        "Only the person who generated the image can buy it in the first hour"
      );
    });

    it("Reverts when exact amount of ether is not provided", async () => {
      const tokenId = new BN("1");
      await this.contract.mintNFT(owner, user1, "tokenURI", price, {from: owner});

      expectRevert(
        this.contract.payImage(tokenId, {from: user1}),
        "Not enough coins to transfer nft",
      );
    });
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

  describe("userBoughtTokens", () => {
    it("Returns a list of tokens the user bought", async () => {
      const value = web3.utils.toWei("100000000", "wei");
      const tokenId = new BN("1");

      await this.contract.mintNFT(owner, user1, "tokenURI1", price, {from: owner});
      await this.contract.mintNFT(owner, user1, "tokenURI2", price, {from: owner});
      this.contract.contract.methods
        .payImage(tokenId)
        .send({from: user1, gas: 500000, value});

      const tokens = await this.contract.userBoughtTokens(user1);

      expect(tokens.length).to.equal(1);
      expect(tokens[0].words[0]).to.equal(1)
    });

    it("Reverts when the user didn't generate any tokens", async () => {
      expectRevert(
        this.contract.userBoughtTokens(owner),
        "User has no bought tokens"
      );
    });
  });
});
