import os
from celery import Celery
import requests

import numpy as np
import cv2

from pinata import PinataClient
import transformers
from transformers import model_paths

import working_directory
import logger

POSTGRES_URL = os.getenv("POSTGRES_CONNECTION_URL")
BROKER_URL = os.getenv("BROKER_URL")
PINATA_JWT = os.getenv("PINATA_JWT")

NFT_SERVICE_MINT_TOKEN_URL = os.getenv("NFT_SERVICE_MINT_TOKEN_URL")

app = Celery("tasks", backend=POSTGRES_URL, broker=BROKER_URL)

def create_token(transformer, transformation_name, payer, image_url, image_name):
  image = _download_image(image_url)
  logger.log_image_downloaded(image_url)

  transformed_image = transformer.transform(image)
  logger.log_image_generated(transformation_name)

  image_path = working_directory.local_file_path(f"{image_name}.jpg")
  cv2.imwrite(image_path, transformed_image)

  pinata_client = PinataClient(PINATA_JWT)

  image_ipfs_url = pinata_client.pin_image(image_path)
  logger.log_image_uploaded(image_ipfs_url)

  metadata_ipfs_url = pinata_client.pin_metadata(image_ipfs_url,
                                                 f"{image_name}.json",
                                                 payer,
                                                 transformation_name)
  logger.log_metadata_uploaded(metadata_ipfs_url)

  working_directory.remove_file(image_path)

  status = _mint_nft(payer, metadata_ipfs_url)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def cartoonify(transformation_name, payer, image_url, image_name):
  cartoonifier = transformers.Cartoonifier()
  status = create_token(cartoonifier, transformation_name, payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def ascii(transformation_name, payer, image_url, image_name):
  ascii = transformers.ASCIIArt()
  status = create_token(ascii, transformation_name, payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def sketch(transformation_name, payer, image_url, image_name):
  sketch = transformers.SketchArt()
  status = create_token(sketch, transformation_name, payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def candy(transformation_name, payer, image_url, image_name):
  candy = transformers.FastNeuralStyle(model_paths.CANDY_FAST_NEURAL_TRANSFER_MODEL)
  status = create_token(candy, transformation_name, payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def feathers(transformation_name, payer, image_url, image_name):
  feather = transformers.FastNeuralStyle(model_paths.FEATHERS_FAST_NEURAL_TRANSFER_MODEL)
  status = create_token(feather, transformation_name, payer, image_url, image_name)

  return status

def _mint_nft(payer, token_uri):
  payload = {"payer": payer, "token_uri": token_uri}
  return requests.post(NFT_SERVICE_MINT_TOKEN_URL, json=payload)

def _download_image(url):
  resp = requests.get(url, stream=True).content
  image = np.asarray(bytearray(resp), dtype="uint8")
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)

  return image
