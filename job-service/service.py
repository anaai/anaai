import os
from dotenv import load_dotenv

from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from celery import Celery
from celery.execute import send_task

import crud
from database import get_session
import task_mapper

import logger

load_dotenv()

POSTGRES_URL = os.getenv("POSTGRES_CONNECTION_URL")
BROKER_URL = os.getenv("BROKER_URL")

RECIPIENT = os.getenv("RECIPIENT")
PRICE = 0

class JobRequest(BaseModel):
  payer: str
  transformation: int
  image_url: str
  image_name: str
  block_hash: str
  transaction_hash: str

celery_app = Celery("tasks", backend=POSTGRES_URL, broker=BROKER_URL)

app = FastAPI()

@app.post("/generate")
async def generate(request: JobRequest, session: Session = Depends(get_session)):
  logger.log_job_request(request.payer, request.transformation,
                         request.image_name, request.image_url)

  try:
    task_name = task_mapper.task_name(request.transformation)
    transformation_name = task_mapper.transformation_name(request.transformation)
  except KeyError:
    raise HTTPException(status_code=400, detail="Transformation not supported")

  job_request = crud.create_job_request(session, request)

  task = celery_app.send_task(task_name,
                              [transformation_name,
                               RECIPIENT,
                               request.payer,
                               PRICE,
                               request.image_url,
                               request.image_name])
  logger.log_job_started(task.id)

  job_request = crud.add_task_to_job_request(session, job_request, task.id)

  return JSONResponse({"task_id": task.id})
