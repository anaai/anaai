import logger

def test_log_token_minted(logs):
  logger.log_token_minted(13)
  assert "Token minted with id: 13." in logs.info

def test_log_token_transfered(logs):
  logger.log_token_transfered(13, "sender", "recipient")
  assert "Token with id: 13 transfered from sender to recipient." in logs.info
