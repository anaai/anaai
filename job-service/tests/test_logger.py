import logger

def test_log_job_request(logs):
  logger.log_job_request("0x321", "2", 1, "image", "url")
  assert "Recieved job request from 0x321 for transformation 2 #1 of image at url" in logs.info

def test_log_job_started(logs):
  logger.log_job_started(13)
  assert "Started job 13." in logs.info
