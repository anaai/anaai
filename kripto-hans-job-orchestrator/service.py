import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from tasks import cartoonify
from celery.execute import send_task
import logger

RECIPIENT = os.getenv("RECIPIENT")
PRICE = 0

class TransformationRequest(BaseModel):
  payer: str
  image_url: str
  image_name: str

app = FastAPI()

@app.post("/cartoonify")
async def create_item(request: TransformationRequest):
  logger.log_job_request(request.payer, request.image_name, request.image_url)
  task = send_task("tasks.cartoonify",
                   [RECIPIENT,
                    request.payer,
                    PRICE,
                    request.image_url,
                    request.image_name])
  logger.log_job_started(task.id)

  return JSONResponse({"task_id": task.id})
