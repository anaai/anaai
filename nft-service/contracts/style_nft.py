class StyleNFT:
  def __init__(self, contract, w3, public_key, private_key):
    self.contract = contract
    self.w3 = w3
    self.public_key = public_key
    self.private_key = private_key

  def balance_of(self, address):
    return self.contract.functions.balanceOf(address).call()

  def total_supply(self):
    return self.contract.functions.totalSupply().call()

  def owner_of(self, token_id):
    return self.contract.functions.ownerOf(token_id).call()

  def mint_nft(self, payer, token_uri):
    fc = self.contract.functions.mintNFT(payer, token_uri)
    tx_hash = self._sign_and_send(fc)
    receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
    return self.contract.events.Transfer().processReceipt(receipt)[0]["args"].tokenId

  def _sign_and_send(self, fc):
    nonce = self.w3.eth.getTransactionCount(self.public_key)

    tx = fc.buildTransaction({"from": self.public_key, "nonce": nonce})
    signed_tx = self.w3.eth.account.sign_transaction(tx, private_key=self.private_key)

    tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return tx_hash
