import os
from celery import Celery

import urllib.request
import numpy as np
import cv2

from cartoonification import Cartoonifier
from pinata import PinataClient
import working_directory

POSTGRES_URL = os.getenv("POSTGRES_CONNECTION_URL")
BROKER_URL = os.getenv("BROKER_URL")
PINATA_JWT = os.getenv("PINATA_JWT")

app = Celery("tasks", backend=POSTGRES_URL, broker=BROKER_URL)

@app.task
def cartoonify(image_url):
  image = _download_image(image_url)
  cartoonified_image = Cartoonifier().cartoonify(image)

  image_path = working_directory.local_file_path("kikibratina5.jpeg")
  cv2.imwrite(image_path, cartoonified_image)

  pinata_client = PinataClient(PINATA_JWT)
  response = pinata_client.pin_image(image_path)

  working_directory.remove_file(image_path)

  return response.status_code

def _download_image(url):
  resp = urllib.request.urlopen(url)
  image = np.asarray(bytearray(resp.read()), dtype="uint8")
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)

  return image
