import os
from celery import Celery
import requests

import urllib.request
import numpy as np
import cv2

from cartoonification import Cartoonifier
from pinata import PinataClient
import working_directory

POSTGRES_URL = os.getenv("POSTGRES_CONNECTION_URL")
BROKER_URL = os.getenv("BROKER_URL")
PINATA_JWT = os.getenv("PINATA_JWT")

NFT_SERVICE_MINT_TOKEN_URL = os.getenv("NFT_SERVICE_MINT_TOKEN_URL")

app = Celery("tasks", backend=POSTGRES_URL, broker=BROKER_URL)

@app.task
def cartoonify(recipient, payer, price, image_url, image_name):
  image = _download_image(image_url)
  cartoonified_image = Cartoonifier().cartoonify(image)

  image_path = working_directory.local_file_path(f"{image_name}.jpg")
  cv2.imwrite(image_path, cartoonified_image)

  pinata_client = PinataClient(PINATA_JWT)
  image_ipfs_url = pinata_client.pin_image(image_path)
  metadata_ipfs_url = pinata_client.pin_metadata(image_ipfs_url, image_name)

  working_directory.remove_file(image_path)

  status = _mint_nft(recipient, payer, metadata_ipfs_url, price)

  return status

def _mint_nft(recipient, payer, token_uri, price):
  payload = {"recipient": recipient, "payer": payer, "token_uri": token_uri, "price": price}
  return requests.post(NFT_SERVICE_MINT_TOKEN_URL, json=payload)

def _download_image(url):
  resp = urllib.request.urlopen(url)
  image = np.asarray(bytearray(resp.read()), dtype="uint8")
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)

  return image
