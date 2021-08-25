//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StyleNFT is ERC721, Ownable {
  struct Asset {
    address payer;
    uint256 time;
    bool exists;
    uint256 price;
  }

  struct UserCollection {
    uint256[] generatedTokens;
    uint256[] boughtTokens;
  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  address payable private admin;
  mapping(uint256 => Asset) private assets;
  mapping(address => UserCollection) private userCollection;

  event ImageGenerationPaid(address sender, uint256 value, string imageURL);
  event ImagePaid(address sender, uint256 value, uint256 tokenId);
  event TokenMinted(address recipient, address payer, uint256 tokenId, string tokenURI, uint256 price);
  event TokenTransfered(address sender, address recipient, uint256 tokenId);

  constructor() public ERC721("styleart", "snft") {
    admin = payable(msg.sender);
  }

  modifier onlyPayerFirstHour(address sender, uint256 tokenId) {
    if (block.timestamp < assets[tokenId].time + 20 seconds) {
      require(
        assets[tokenId].payer == sender,
        "Only the person who generated the image can buy it in the first hour"
      );
    }

    _;
  }

  function payGenerating(string memory imageUrl) public payable {
    require(msg.value == 0 wei, "Not enough coins to generate image");
    admin.transfer(msg.value);
    emit ImageGenerationPaid(msg.sender, msg.value, imageUrl);
  }

  function payImage(uint256 tokenId)
  public payable onlyPayerFirstHour(msg.sender, tokenId)
  {
    uint256 price = 1 wei * assets[tokenId].price;
    require(msg.value == price, "Not enough coins to transfer nft");
    // require tokenURI to exist

    admin.transfer(msg.value);
    userCollection[msg.sender].boughtTokens.push(tokenId);
    emit ImagePaid(msg.sender, msg.value, tokenId);
  }

  function mintNFT(address recipient, address payer, string memory tokenURI, uint256 price)
  public onlyOwner
  returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);

    assets[newItemId] = Asset(payer, block.timestamp, true, price);
    userCollection[payer].generatedTokens.push(newItemId);

    emit TokenMinted(recipient, payer, newItemId, tokenURI, price);

    return newItemId;
  }

  function payerOf(uint256 tokenId) external view returns (address) {
    require(assets[tokenId].exists, "Token doesn't exist");
    return assets[tokenId].payer;
  }

  function userGeneratedTokens(address user) external view returns (uint256[] memory) {
    require(userCollection[user].generatedTokens.length > 0, "User has no generated tokens");
    return userCollection[user].generatedTokens;
  }

  function userBoughtTokens(address user) external view returns (uint256[] memory) {
    require(userCollection[user].boughtTokens.length > 0, "User has no bought tokens");
    return userCollection[user].boughtTokens;
  }
}
