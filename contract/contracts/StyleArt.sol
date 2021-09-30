// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StyleArt is ERC721, Ownable {
  struct Asset {
    address payer;
    uint256 time;
    bool exists;
  }

  struct UserCollection {
    uint256[] generatedTokens;
  }

  struct Transformation {
    uint256 id;
    uint256 price;
    uint256 supply;
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
  event TokenMinted(address payer, uint256 tokenId, string tokenURI);

  constructor() ERC721("styleart", "sart") {
    admin = payable(msg.sender);
  }

  modifier availableTransformation(uint256 id, uint256 price) {
    bool exists = false;
    for (uint i = 0; i < transformations.length; i++) {
      if (transformations[i].id == id) {
        exists = true;

        require(
          transformations[i].price == price,
          "Transaction value must match transformation price"
        );

        require(
          transformations[i].supply > 0,
          "Transformation supply is exhausted"
        );
      }
    }

    require(exists, "Requested transformation doesn't exist");

    _;
  }

  modifier validToken(uint256 tokenId) {
    require(assets[tokenId].exists, "Token does not exist");

    _;
  }

  function payGenerating(uint256 transformationId, string memory imageUrl)
  public payable availableTransformation(transformationId, msg.value) {
    for (uint i = 0; i < transformations.length; i++) {
      if (transformations[i].id == transformationId) {
        transformations[i].supply -= 1;
      }
    }

    admin.transfer(msg.value);
    emit ImageGenerationPaid(msg.sender, msg.value, transformationId, imageUrl);
  }

  function mintNFT(address payer, string memory tokenURI)
  public onlyOwner
  returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(payer, newItemId);
    _setTokenURI(newItemId, tokenURI);

    assets[newItemId] = Asset(payer, block.timestamp, true);
    userCollection[payer].generatedTokens.push(newItemId);

    emit TokenMinted(payer, newItemId, tokenURI);

    return newItemId;
  }

  function addTransformation(string memory name, uint256 price, uint256 supply)
  public onlyOwner returns (uint256) {
    _transformationIds.increment();
    uint256 newTransformationId = _transformationIds.current();

    transformations.push(Transformation(newTransformationId, price, supply, name));

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

  function listTransformations() external view returns (Transformation[] memory) {
    return transformations;
  }
}
