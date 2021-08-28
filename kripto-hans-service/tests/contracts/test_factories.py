from unittest.mock import patch
import web3

from contracts.factories import style_nft_factory
from contracts.style_nft import StyleNFT

CONTRACT_PATH = "./contracts/StyleNFT.json"
CONTRACT_ADDRESS = "0x4E4648af923336AEb2E72C0c9bb80Ae62F2684de"

CONTRACT_FUNCTIONS = [
    'mintNFT', 'ownerOf', 'payGenerating', 'payImage', 'payerOf', 'renounceOwnership',
    'safeTransferFrom', 'tokenByIndex', 'tokenURI', 'totalSupply', 'transferFrom',
    'transferOwnership', 'userBoughtTokens', 'userGeneratedTokens'
]

def test_style_nft_factory():
  contract = style_nft_factory("public_key", "private_key", "api_url", CONTRACT_ADDRESS, CONTRACT_PATH)
  assert type(contract) == StyleNFT

  assert contract.public_key == "public_key"
  assert contract.private_key == "private_key"

def test_style_nft_contract_interface():
  contract = style_nft_factory("public_key", "private_key", "api_url", CONTRACT_ADDRESS, CONTRACT_PATH)
  for f in CONTRACT_FUNCTIONS:
    assert hasattr(contract.contract.functions, f)