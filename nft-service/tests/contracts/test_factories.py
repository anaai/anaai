from unittest.mock import patch
import web3

from contracts.factories import style_art_factory
from contracts.style_art import StyleArt

CONTRACT_PATH = "./contracts/StyleArt.json"
CONTRACT_ADDRESS = "0x4E4648af923336AEb2E72C0c9bb80Ae62F2684de"

CONTRACT_FUNCTIONS = [
    'mintNFT', 'ownerOf', 'payGenerating', 'payerOf', 'renounceOwnership',
    'safeTransferFrom', 'tokenByIndex', 'tokenURI', 'totalSupply', 'transferFrom',
    'transferOwnership', 'userGeneratedTokens'
]

def test_style_art_factory():
  contract = style_art_factory("public_key", "private_key", "api_url", CONTRACT_ADDRESS, CONTRACT_PATH)
  assert type(contract) == StyleArt

  assert contract.public_key == "public_key"
  assert contract.private_key == "private_key"

def test_style_art_contract_interface():
  contract = style_art_factory("public_key", "private_key", "api_url", CONTRACT_ADDRESS, CONTRACT_PATH)
  for f in CONTRACT_FUNCTIONS:
    assert hasattr(contract.contract.functions, f)
