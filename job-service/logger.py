import logging

LOGGER_NAME = "JOB_SERVICE_LOGGER"
FORMAT = "%(levelname)s:%(message)s"

def log_job_request(payer, transformation, image_name, image_url):
  logger = _logger()
  logger.info(f"Recieved job request from {payer} for transformation {transformation} of {image_name} at {image_url}.")

def log_job_started(job_id):
  logger = _logger()
  logger.info(f"Started job {job_id}.")

def _logger():
  logging.basicConfig(format=FORMAT, level=logging.INFO)
  return logging.getLogger(LOGGER_NAME)
