import logging

LOGGER_NAME = "NFT_SERVICE_LOGGER"
FORMAT = "%(levelname)s:%(message)s"

def log_token_minted(payer, token_id, token_uri):
  logger = _logger()
  logger.info(f"Token minted with id: {token_id} for address: {payer} at uri: {token_uri}.")

def _logger():
  logging.basicConfig(format=FORMAT, level=logging.INFO)
  return logging.getLogger(LOGGER_NAME)
