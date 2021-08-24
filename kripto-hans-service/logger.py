import logging

LOGGER_NAME = "NFT_SERVICE_LOGGER"
FORMAT = "%(levelname)s:%(message)s"

def log_token_minted(token_id):
  logger = _logger()
  logger.info(f"Token minted with id: {token_id}.")

def log_token_transfered(token_id, sender, recipient):
  logger = _logger()
  logger.info(f"Token with id: {token_id} transfered from {sender} to {recipient}.")

def _logger():
  logging.basicConfig(format=FORMAT, level=logging.INFO)
  return logging.getLogger(LOGGER_NAME)
