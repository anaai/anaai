import logger

def test_log_token_minted(logs):
  logger.log_token_minted("0x123", 13, "http://token_uri.com")
  assert "Token minted with id: 13 for address: 0x123 at uri: http://token_uri.com." in logs.info
