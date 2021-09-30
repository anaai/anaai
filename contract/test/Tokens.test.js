const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const StyleNFT = contract.fromArtifact("StyleArt");

describe("StyleArt", () => {
  const [ owner, user1 ] = accounts;
  const uri = "token1URI";

  beforeEach(async () => {
    // Deploy a new contract for each test
    this.contract = await StyleNFT.new({from: owner});
  });

  describe("mintNFT", () => {
    it("Mints an NFT when you are the owner", async () => {
      const oldSupply = await this.contract.totalSupply();
      const oldBalance = await this.contract.balanceOf(user1);

      await this.contract.mintNFT(user1, uri, {from: owner});

      const tokenOwner = await this.contract.ownerOf(1);
      const tokenURI = await this.contract.tokenURI(1);

      const newSupply = await this.contract.totalSupply();
      const newBalance = await this.contract.balanceOf(user1);

      expect(oldSupply.toNumber()).to.equal(0);
      expect(newSupply.toNumber()).to.equal(1);

      expect(oldBalance.toNumber()).to.equal(0);
      expect(newBalance.toNumber()).to.equal(1);

      expect(tokenOwner).to.equal(user1);
      expect(tokenURI).to.equal(uri);
    });

    it("Emits TokenMinted event", async () => {
      const tokenId = new BN("1");

      const tx = await this.contract.mintNFT(user1, uri, {from: owner});

      expectEvent(
        tx,
        "TokenMinted",
        {payer: user1, tokenId, tokenURI: uri}
      );
    });

    it("Doesn't mint a token when you are not the owner", async () => {
      await expectRevert(
        this.contract.mintNFT(user1, uri, {from: user1}),
        "Ownable: caller is not the owner"
      );
    });
  });
});
