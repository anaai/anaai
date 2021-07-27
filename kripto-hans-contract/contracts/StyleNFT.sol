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
  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  address payable private admin;
  // mapping(address => string[]) public payers;
  mapping(uint256 => Asset) public payers;

  event ImageGenerationPaid(address sender, uint256 value, string imageURL);
  event ImagePaid(address sender, uint256 value, uint256 tokenId);
  event TokenMinted(address recipient, address payer, uint256 tokenId, string tokenURI);
  event TokenTransfered(address sender, address recipient, uint256 tokenId);

  constructor() public ERC721("NFT2", "NFT2") {
    admin = payable(msg.sender);
  }

  modifier onlyPayerFirstHour(address sender, uint256 tokenId) {
    if (block.timestamp < payers[tokenId].time + 20 seconds) {
      require(
        payers[tokenId].payer == sender,
        "Only the person who generated the image can buy it in the first hour"
      );
    }

    _;
  }

  function payGenerating(string memory imageUrl) public payable {
    require(msg.value == 1 ether, "Not enough coins to generate image");
    admin.transfer(msg.value);
    emit ImageGenerationPaid(msg.sender, msg.value, imageUrl);
  }

  function payImage(uint256 tokenId)
  public payable onlyPayerFirstHour(msg.sender, tokenId)
  {
    require(msg.value == 2 ether, "Not enough coins to transfer nft");
    // require tokenURI to exist

    admin.transfer(msg.value);
    emit ImagePaid(msg.sender, msg.value, tokenId);
  }

  function mintNFT(address recipient, address payer, string memory tokenURI)
  public onlyOwner
  returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);

    // payers[payer].push(tokenURI);
    payers[newItemId] = Asset(payer, block.timestamp, true);

    emit TokenMinted(recipient, payer, newItemId, tokenURI);

    return newItemId;
  }

  function payerOf(uint256 tokenId) external view returns (address) {
    require(payers[tokenId].exists, "Token doesn't exist");
    return payers[tokenId].payer;
  }
}
