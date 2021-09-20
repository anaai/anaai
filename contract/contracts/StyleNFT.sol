//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StyleNFT is ERC721, Ownable {
  struct Asset {
    address payer;
    uint256 time;
    uint256 price;
    bool exists;
    bool paid;
  }

  struct UserCollection {
    uint256[] generatedTokens;
    uint256[] boughtTokens;
  }

  struct Transformation {
    uint256 id;
    uint256 price;
    string name;
  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _transformationIds;

  address payable private admin;

  mapping(uint256 => Asset) private assets;
  mapping(address => UserCollection) private userCollection;
  Transformation[] private transformations;

  event ImageGenerationPaid(address sender, uint256 value, uint256 transformationId, string imageURL);
  event ImagePaid(address sender, uint256 value, uint256 tokenId);
  event TokenMinted(address recipient, address payer, uint256 tokenId, string tokenURI, uint256 price);

  constructor() ERC721("styleart", "snft") {
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

  modifier existingTransformation(uint256 id, uint256 price) {
    bool exists = false;
    for (uint i = 0; i < transformations.length; i++) {
      if (transformations[i].id == id) {
        exists = true;

        require(
          transformations[i].price == price,
          "Transaction value must match transformation price"
        );
      }
    }

    require(exists, "Requested transformation doesn't exist");

    _;
  }

  modifier validNonBoughtToken(uint256 tokenId) {
    require(assets[tokenId].exists, "Token does not exist");
    require(assets[tokenId].paid == false, "Token already bought");

    _;
  }

  function payGenerating(uint256 transformationId, string memory imageUrl)
  public payable existingTransformation(transformationId, msg.value) {
    admin.transfer(msg.value);
    emit ImageGenerationPaid(msg.sender, msg.value, transformationId, imageUrl);
  }

  function payImage(uint256 tokenId)
  public payable
  validNonBoughtToken(tokenId)
  onlyPayerFirstHour(msg.sender, tokenId)
  {
    require(msg.value == assets[tokenId].price, "Transaction value must match nft price");

    admin.transfer(msg.value);
    assets[tokenId].paid = true;
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

    assets[newItemId] = Asset(payer, block.timestamp, price, true, false);
    userCollection[payer].generatedTokens.push(newItemId);

    emit TokenMinted(recipient, payer, newItemId, tokenURI, price);

    return newItemId;
  }

  function updateTokenPrice(uint256 tokenId, uint256 price)
  public onlyOwner validNonBoughtToken(tokenId)
  returns (bool)
  {
    // only owned tokens
    assets[tokenId].price = price;
    return true;
  }

  function addTransformation(string memory name, uint256 price) public onlyOwner returns (uint256) {
    _transformationIds.increment();
    uint256 newTransformationId = _transformationIds.current();

    transformations.push(Transformation(newTransformationId, price, name));

    return newTransformationId;
  }

  function updateTransformationPrice(uint256 id, uint256 price) public onlyOwner returns (bool) {
    for (uint i = 0; i < transformations.length; i++) {
      if (transformations[i].id == id) {
        transformations[i].price = price;
        return true;
      }
    }

    return false;
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

  function listTransformations() external view returns (Transformation[] memory) {
    return transformations;
  }
}
