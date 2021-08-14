import os
from dotenv import load_dotenv

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from starlette.responses import StreamingResponse
from pydantic import BaseModel

import web3
from web3 import Web3

import cv2
import numpy as np
from PIL import Image
import io

from cartoonify import Cartoonifier
from contracts import style_nft_factory

load_dotenv()

PUBLIC_KEY = Web3.toChecksumAddress(os.getenv("PUBLIC_KEY"))
PRIVATE_KEY = f'0x{os.getenv("PRIVATE_KEY")}'
API_URL = os.getenv("API_URL")
CONTRACT_ADDRESS = Web3.toChecksumAddress(os.getenv("CONTRACT_ADDRESS"))
CONTRACT_PATH = "contracts/StyleNFT.json"

app = FastAPI()

class NFTPayload(BaseModel):
  recipient: str
  payer: str
  token_uri: str
  price: float

@app.get("/status")
async def get_status():
  return "Service running"

@app.post("/cartoonify")
async def cartoonify(image: UploadFile = File(...)):
  image = _load_image(await image.read())
  cartoonified_image = Cartoonifier().cartoonify(image)
  encoded_image = _encode_image(cartoonified_image)

  return StreamingResponse(io.BytesIO(encoded_image.tobytes()),
                           media_type="image/png")

@app.post("/mint_nft")
async def mint_nft(nft: NFTPayload):
  contract = style_nft_factory(PUBLIC_KEY, PRIVATE_KEY, API_URL, CONTRACT_ADDRESS, CONTRACT_PATH)
  token_id = contract.mint_nft(Web3.toChecksumAddress(nft.recipient),
                               Web3.toChecksumAddress(nft.payer),
                               nft.token_uri,
                               Web3.toWei(nft.price, "ether"))
  print(token_id)
  return JSONResponse({"token_id", token_id})

def _load_image(data):
  image = Image.open(io.BytesIO(data))
  return np.array(image)

def _encode_image(image):
  _, encoded_image = cv2.imencode(".png", image)
  return encoded_image
