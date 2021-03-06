// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StyleArt is ERC721, Ownable {
  struct Transformation {
    uint256 id;
    uint256 price;
    uint256 supply;
    uint256 nTokens;
    string name;
    bool exists;
  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _transformationIds;

  address payable private admin;
  mapping(address => bool) public minters;

  mapping(address => uint256[]) private userCollection;
  uint256[] private transformationIds;
  mapping(uint256 => Transformation) private transformations;

  event ImageGenerationPaid(address sender, uint256 value, uint256 transformationId,
                            uint256 transformationNumber, bytes params);
  event TokenMinted(address payer, uint256 tokenId, string tokenURI);

  constructor() ERC721("styleart", "sart") {
    admin = payable(msg.sender);
  }

  modifier availableTransformation(uint256 id, uint256 price) {
    if (transformations[id].exists) {
      require(
        transformations[id].price == price,
        "Transaction value must match transformation price"
      );
      require(
        transformations[id].nTokens < transformations[id].supply,
        "Transformation supply is exhausted"
      );
    } else {
      require(transformations[id].exists, "Requested transformation doesn't exist");
    }

    _;
  }

  modifier adminOrMinter() {
    require(msg.sender == admin || minters[msg.sender] == true, "No permission to mint");
    _;
  }

  function payGenerating(uint256 transformationId, bytes memory params)
  public payable availableTransformation(transformationId, msg.value) {
    uint256 transformationNumber;

    transformations[transformationId].nTokens += 1;
    transformationNumber = transformations[transformationId].nTokens;

    admin.transfer(msg.value);
    emit ImageGenerationPaid(msg.sender, msg.value, transformationId, transformationNumber, params);
  }

  function mintNFT(address payer, string memory tokenURI)
  public adminOrMinter
  returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(payer, newItemId);
    _setTokenURI(newItemId, tokenURI);

    userCollection[payer].push(newItemId);

    emit TokenMinted(payer, newItemId, tokenURI);

    return newItemId;
  }

  function addMinter(address minter) public onlyOwner returns (bool) {
    minters[minter] = true;
    return true;
  }

  function removeMinter(address minter) public onlyOwner returns (bool) {
    minters[minter] = false;
    return true;
  }

  function addTransformation(string memory name, uint256 price, uint256 supply)
  public onlyOwner returns (uint256) {
    _transformationIds.increment();
    uint256 newTransformationId = _transformationIds.current();

    transformationIds.push(newTransformationId);
    transformations[newTransformationId] = Transformation(
      newTransformationId, price, supply, 0, name, true
    );

    return newTransformationId;
  }

  // another modifier for checking id of transformation
  function updateTransformationPrice(uint256 id, uint256 price) public onlyOwner returns (bool) {
    transformations[id].price = price;

    return true;
  }

  function userGeneratedTokens(address user) external view returns (uint256[] memory) {
    return userCollection[user];
  }

  function listTransformations() external view returns (Transformation[] memory) {
    Transformation[] memory transformationsList = new Transformation[](transformationIds.length);
    for (uint i = 0; i < transformationIds.length; i++) {
      transformationsList[i] = transformations[transformationIds[i]];
    }
    return transformationsList;
  }
}
