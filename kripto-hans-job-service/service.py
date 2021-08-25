import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from celery import Celery
from celery.execute import send_task

import logger

POSTGRES_URL = os.getenv("POSTGRES_CONNECTION_URL")
BROKER_URL = os.getenv("BROKER_URL")

RECIPIENT = os.getenv("RECIPIENT")
PRICE = 0

class TransformationRequest(BaseModel):
  payer: str
  image_url: str
  image_name: str

celery_app = Celery("tasks", backend=POSTGRES_URL, broker=BROKER_URL)

app = FastAPI()

@app.post("/cartoonify")
async def create_item(request: TransformationRequest):
  logger.log_job_request(request.payer, request.image_name, request.image_url)
  task = celery_app.send_task("tasks.cartoonify",
                              [RECIPIENT,
                               request.payer,
                               PRICE,
                               request.image_url,
                               request.image_name])
  logger.log_job_started(task.id)

  return JSONResponse({"task_id": task.id})
