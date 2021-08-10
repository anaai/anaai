import os
from celery import Celery

import urllib.request
import numpy as np
import cv2

from cartoonification import Cartoonifier

postgres_url = os.getenv("POSTGRES_CONNECTION_URL")
broker_url = os.getenv("BROKER_URL")

app = Celery("tasks", backend=postgres_url, broker=broker_url)

@app.task
def cartoonify(image_url):
  image = _download_image(image_url)
  cartoonified_image = Cartoonifier().cartoonify(image)
  shape = cartoonified_image.shape

  return shape

def _download_image(url):
  resp = urllib.request.urlopen(url)
  image = np.asarray(bytearray(resp.read()), dtype="uint8")
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)

  return image
