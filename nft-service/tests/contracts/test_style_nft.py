import pytest
import json

from web3 import EthereumTesterProvider, Web3
from eth_tester import EthereumTester, PyEVMBackend
import eth_tester.backends.pyevm.main as py_evm_main

from contracts.style_art import StyleArt

py_evm_main.GENESIS_GAS_LIMIT = 10000000
PRIVATE_KEY = "0x0000000000000000000000000000000000000000000000000000000000000001"

"""
To find private key of test account_keys:
  pyevm_backend = PyEVMBackend()
  for pk in pyevm_backend.accounts:
    print(pk)
"""

@pytest.fixture
def tester_provider():
  return EthereumTesterProvider(EthereumTester(PyEVMBackend()))

@pytest.fixture
def eth_tester(tester_provider):
  return tester_provider.ethereum_tester

@pytest.fixture
def w3(tester_provider):
  w3 = Web3(tester_provider)
  return w3

@pytest.fixture
def contract(eth_tester, w3):
  deploy_address = eth_tester.get_accounts()[0]

  with open("contracts/StyleArt.json") as f:
    contract = json.load(f)
    abi = contract["abi"]
    bytecode = contract["bytecode"]

  StyleArtContract = w3.eth.contract(abi=abi, bytecode=bytecode)

  tx_hash = StyleArtContract.constructor().transact({
    "from": deploy_address,
    "gas": 10000000
  })
  # wait for the transaction to be mined
  tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash, 180)
  # instantiate and return an instance of our contract.
  contract = w3.eth.contract(abi=abi, address=tx_receipt.contractAddress)

  style_art = StyleArt(contract, w3, deploy_address, PRIVATE_KEY)

  return style_art

def test_contract_creation(contract):
  assert type(contract) is StyleArt

def test_total_supply(contract):
  assert contract.total_supply() == 0

def test_balance_of(eth_tester, contract):
  owner = eth_tester.get_accounts()[0]
  contract.mint_nft(owner, "token_uri")

  assert contract.balance_of(owner) == 1

def test_minting_nft(eth_tester, contract):
  owner = eth_tester.get_accounts()[0]
  address = eth_tester.get_accounts()[-1]

  token_id = contract.mint_nft(address, "token_uri")
  assert token_id == 1

  assert contract.balance_of(address) == 1
  assert contract.balance_of(owner) == 0
