// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StyleArt is ERC721, Ownable {
  struct UserCollection {
    uint256[] generatedTokens;
  }

  struct Transformation {
    uint256 id;
    uint256 price;
    uint256 supply;
    uint256 nTokens;
    string name;
    string description;
  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _transformationIds;

  address payable private admin;

  mapping(address => UserCollection) private userCollection;
  Transformation[] private transformations;

  event ImageGenerationPaid(address sender, uint256 value, uint256 transformationId,
                            uint256 transformationNumber, string imageURL);
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
          transformations[i].nTokens < transformations[i].supply,
          "Transformation supply is exhausted"
        );
      }
    }

    require(exists, "Requested transformation doesn't exist");

    _;
  }

  function payGenerating(uint256 transformationId, string memory imageUrl)
  public payable availableTransformation(transformationId, msg.value) {
    uint256 transformationNumber;

    for (uint i = 0; i < transformations.length; i++) {
      if (transformations[i].id == transformationId) {
        transformations[i].nTokens += 1;
        transformationNumber = transformations[i].nTokens;
        break;
      }
    }

    admin.transfer(msg.value);
    emit ImageGenerationPaid(msg.sender, msg.value, transformationId, transformationNumber, imageUrl);
  }

  function mintNFT(address payer, string memory tokenURI)
  public onlyOwner
  returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(payer, newItemId);
    _setTokenURI(newItemId, tokenURI);

    userCollection[payer].generatedTokens.push(newItemId);

    emit TokenMinted(payer, newItemId, tokenURI);

    return newItemId;
  }

  function addTransformation(string memory name, string memory description, uint256 price, uint256 supply)
  public onlyOwner returns (uint256) {
    _transformationIds.increment();
    uint256 newTransformationId = _transformationIds.current();

    transformations.push(Transformation(newTransformationId, price, supply, 0, name, description));

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

  function userGeneratedTokens(address user) external view returns (uint256[] memory) {
    require(userCollection[user].generatedTokens.length > 0, "User has no generated tokens");
    return userCollection[user].generatedTokens;
  }

  function listTransformations() external view returns (Transformation[] memory) {
    return transformations;
  }
}
