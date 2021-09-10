import os
from celery import Celery
import requests

import numpy as np
import cv2

from pinata import PinataClient
import transformers
import working_directory

POSTGRES_URL = os.getenv("POSTGRES_CONNECTION_URL")
BROKER_URL = os.getenv("BROKER_URL")
PINATA_JWT = os.getenv("PINATA_JWT")

NFT_SERVICE_MINT_TOKEN_URL = os.getenv("NFT_SERVICE_MINT_TOKEN_URL")

app = Celery("tasks", backend=POSTGRES_URL, broker=BROKER_URL)

def create_token(transformer, transformation_name, recipient,
                 payer, price, image_url, image_name):
  image = _download_image(image_url)
  transformed_image = transformer.transform(image)

  image_path = working_directory.local_file_path(f"{image_name}.jpg")
  cv2.imwrite(image_path, transformed_image)

  pinata_client = PinataClient(PINATA_JWT)
  image_ipfs_url = pinata_client.pin_image(image_path)
  metadata_ipfs_url = pinata_client.pin_metadata(image_ipfs_url,
                                                 f"{image_name}.json",
                                                 payer,
                                                 transformation_name)

  working_directory.remove_file(image_path)

  status = _mint_nft(recipient, payer, metadata_ipfs_url, price)

  return status

@app.task
def cartoonify(transformation_name, recipient, payer, price, image_url, image_name):
  cartoonifier = transformers.Cartoonifier()
  status = create_token(cartoonifier, transformation_name, recipient, payer, price, image_url, image_name)

  return status

@app.task
def ascii(transformation_name, recipient, payer, price, image_url, image_name):
  ascii = transformers.ASCIIArt()
  status = create_token(ascii, transformation_name, recipient, payer, price, image_url, image_name)

  return status

@app.task
def sketch(transformation_name, recipient, payer, price, image_url, image_name):
  sketch = transformers.SketchArt()
  status = create_token(sketch, transformation_name, recipient, payer, price, image_url, image_name)

  return status

def _mint_nft(recipient, payer, token_uri, price):
  payload = {"recipient": recipient, "payer": payer, "token_uri": token_uri, "price": price}
  return requests.post(NFT_SERVICE_MINT_TOKEN_URL, json=payload)

def _download_image(url):
  resp = requests.get(url, stream=True).content
  image = np.asarray(bytearray(resp), dtype="uint8")
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)

  return image
