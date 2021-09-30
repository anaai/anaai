from web3 import Web3
import json

from contracts.style_art import StyleArt

def style_art_factory(public_key, private_key, api_url, contract_address, contract_path):
  w3 = Web3(Web3.HTTPProvider(api_url));
  contract_abi = _contract_abi(contract_path)
  contract = w3.eth.contract(address=contract_address, abi=contract_abi)
  return StyleArt(contract, w3, public_key, private_key)

def _contract_abi(contract_path):
  with open(contract_path) as f:
    contract = json.load(f)
    return contract["abi"]
