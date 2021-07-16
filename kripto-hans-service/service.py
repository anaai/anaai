from fastapi import FastAPI, File, UploadFile
from starlette.responses import StreamingResponse

import cv2
import numpy as np
from PIL import Image
import io

from cartoonify import Cartoonifier

app = FastAPI()

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

def _load_image(data):
  image = Image.open(io.BytesIO(data))
  return np.array(image)

def _encode_image(image):
  _, encoded_image = cv2.imencode(".png", image)
  return encoded_image
