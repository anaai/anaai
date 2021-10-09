import logger

def test_log_image_downloaded(logs):
  logger.log_image_downloaded("http://image_url.com")
  assert "Image downloaded from http://image_url.com." in logs.info

def test_log_image_generated(logs):
  logger.log_image_generated("style transfer", 1)
  assert "Image generated using style transfer transformation #1" in logs.info

def test_log_image_uploaded(logs):
  logger.log_image_uploaded("ipfs://image_url.com")
  assert "Image uploaded to ipfs://image_url.com." in logs.info

def test_log_metadata_uploaded(logs):
  logger.log_metadata_uploaded("ipfs://metadata_url.com")
  assert "Metadata uploaded to ipfs://metadata_url.com." in logs.info
