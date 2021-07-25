//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
  struct Asset {
    address payer;
    uint256 time;
  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  address payable private admin;
  // mapping(address => string[]) public payers;
  mapping(string => Asset) public payers;

  event ImageGenerationPaid(address sender, uint256 value, string imageURL);
  event ImagePaid(address sender, uint256 value, string tokenURI);
  event TokenMinted(address recipient, address payer, string tokenId, string tokenURI);
  event TokenTransfered(address sender, address recipient, string tokenId);

  constructor() public ERC721("NFT2", "NFT2") {
    admin = payable(msg.sender);
  }

  modifier onlyPayerFirstHour(address sender, string memory tokenURI) {
    if (block.timestamp < payers[tokenURI].time + 20 seconds) {
      require(
        payers[tokenURI].payer == sender,
        "Only the person who generated the image can buy it in the first hour"
      );
    }

    _;
  }

  function payGenerating(string memory imageUrl) public payable {
    require(msg.value == 1 ether, "Not enough gold generate");
    admin.transfer(msg.value);
    emit ImageGenerationPaid(msg.sender, msg.value, imageUrl);

  }

  function payImage(string memory tokenURI)
  public payable onlyPayerFirstHour(msg.sender, tokenURI)
  {
    require(msg.value == 2 ether, "Not enough gold pay");

    admin.transfer(msg.value);
    emit ImagePaid(msg.sender, msg.value, tokenURI);

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
    payers[tokenURI] = Asset(payer, block.timestamp);

    return newItemId;
  }

  function getAdmin() public view returns (address) {
    return admin;
  }
}
