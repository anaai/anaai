import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from tasks import cartoonify

RECIPIENT = os.getenv("RECIPIENT")
PRICE = 0

class TransformationRequest(BaseModel):
  payer: str
  image_url: str
  image_name: str

app = FastAPI()

@app.post("/cartoonify")
async def create_item(request: TransformationRequest):
  task = cartoonify.delay(RECIPIENT,
                          request.payer,
                          PRICE,
                          request.image_url,
                          request.image_name)
  return JSONResponse({"task_id": task.id})
