import logger

def test_log_token_minted(logs):
  logger.log_token_minted(13)
  assert "Token minted with id: 13." in logs.info
