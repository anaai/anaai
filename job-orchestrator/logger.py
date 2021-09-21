import logging

LOGGER_NAME = "JOB_ORCHESTRATOR_LOGGER"
FORMAT = "%(levelname)s:%(message)s"

def log_image_downloaded(image_url):
  logger = _logger()
  logger.info(f"Image downloaded from {image_url}.")

def log_image_generated(transformation_name):
  logger = _logger()
  logger.info(f"Image generated using {transformation_name} transformation.")

def log_image_uploaded(image_url):
  logger = _logger()
  logger.info(f"Image uploaded to {image_url}.")

def log_metadata_uploaded(metadata_url):
  logger = _logger()
  logger.info(f"Metadata uploaded to {metadata_url}.")

def _logger():
  logging.basicConfig(format=FORMAT, level=logging.INFO)
  return logging.getLogger(LOGGER_NAME)
