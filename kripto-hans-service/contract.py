from web3 import Web3
import json

class Contract:
  def __init__(self, public_key, private_key, api_url, contract_path, contract_address):
    self.public_key = public_key
    self.private_key = private_key

    self.w3 = Web3(Web3.HTTPProvider(api_url));
    contract_abi = self._contract_abi(contract_path)
    self.contract = self.w3.eth.contract(address=contract_address, abi=contract_abi)

  def balance_of(self, address):
    return self.contract.functions.balanceOf(address).call()

  def total_supply(self):
    return self.contract.functions.totalSupply().call()

  def mint_token(self, address, token_uri):
    fc = self.contract.functions.mintNFT(address, token_uri)
    nonce = self.w3.eth.getTransactionCount(self.public_key)

    tx = fc.buildTransaction({"from": self.public_key, "nonce": nonce})
    signed_tx = self.w3.eth.account.sign_transaction(tx, private_key=self.private_key)

    tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
    return self.contract.events.Transfer().processReceipt(receipt)[0]["args"].tokenId

  def _contract_abi(self, contract_path):
    with open(contract_path) as f:
      contract = json.load(f)
      return contract["abi"]
