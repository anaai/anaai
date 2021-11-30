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

PINATA_JWT = os.getenv("PINATA_JWT")
NFT_SERVICE_MINT_TOKEN_URL = os.getenv("NFT_SERVICE_MINT_TOKEN_URL")

app = Celery("tasks")
app.config_from_object("celeryconfig")

def create_token(transformer, transformation_name, transformation_number,
                 payer, image_url, image_name):
  image = _download_image(image_url)
  logger.log_image_downloaded(image_url)

  transformed_image = transformer.transform(image)
  logger.log_image_generated(transformation_name, transformation_number)

  image_path = working_directory.local_file_path(f"{image_name}.jpg")
  cv2.imwrite(image_path, transformed_image)

  pinata_client = PinataClient(PINATA_JWT)

  image_ipfs_url = pinata_client.pin_image(image_path)
  logger.log_image_uploaded(image_ipfs_url)

  token_name = f"{transformation_name} #{transformation_number}"
  metadata_ipfs_url = pinata_client.pin_metadata(image_ipfs_url,
                                                 token_name,
                                                 payer,
                                                 transformation_name)
  logger.log_metadata_uploaded(metadata_ipfs_url)

  working_directory.remove_file(image_path)

  status = _mint_nft(payer, metadata_ipfs_url)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def ascii(transformation_name, transformation_number, payer, image_url, image_name):
  ascii = transformers.ASCIIArt()
  status = create_token(ascii, transformation_name, transformation_number,
                        payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def candy(transformation_name, transformation_number, payer, image_url, image_name):
  candy = transformers.FastNeuralStyle(model_paths.CANDY_FAST_NEURAL_TRANSFER_MODEL)
  status = create_token(candy, transformation_name, transformation_number,
                        payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def mosaic(transformation_name, transformation_number, payer, image_url, image_name):
  mosaic = transformers.FastNeuralStyle(model_paths.MOSAIC_FAST_NEURAL_TRANSFER_MODEL)
  status = create_token(mosaic, transformation_name, transformation_number,
                        payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def the_scream(transformation_name, transformation_number, payer, image_url, image_name):
  the_scream = transformers.FastNeuralStyle(model_paths.THE_SCREAM_FAST_NEURAL_TRANSFER_MODEL)
  status = create_token(the_scream, transformation_name, transformation_number,
                        payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def udnie(transformation_name, transformation_number, payer, image_url, image_name):
  udnie = transformers.FastNeuralStyle(model_paths.UDNIE_FAST_NEURAL_TRANSFER_MODEL)
  status = create_token(udnie, transformation_name, transformation_number,
                        payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def celeba_distill(transformation_name, transformation_number, payer, image_url, image_name):
  celeba_distill = transformers.AnimeGAN(model_paths.CELEBA_DISTILL_ANIME_GAN)
  status = create_token(celeba_distill, transformation_name, transformation_number,
                        payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def face_paint(transformation_name, transformation_number, payer, image_url, image_name):
  face_paint = transformers.AnimeGAN(model_paths.FACE_PAINT_ANIME_GAN)
  status = create_token(face_paint, transformation_name, transformation_number,
                        payer, image_url, image_name)

  return status

@app.task(autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 5})
def paprika(transformation_name, transformation_number, payer, image_url, image_name):
  paprika = transformers.AnimeGAN(model_paths.PAPRIKA_ANIME_GAN)
  status = create_token(paprika, transformation_name, transformation_number,
                        payer, image_url, image_name)

  return status

def _mint_nft(payer, token_uri):
  payload = {"payer": payer, "token_uri": token_uri}
  return requests.post(NFT_SERVICE_MINT_TOKEN_URL, json=payload)

def _download_image(url):
  resp = requests.get(url, stream=True).content
  image = np.asarray(bytearray(resp), dtype="uint8")
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)

  return image
