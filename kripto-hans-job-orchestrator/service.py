from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from tasks import cartoonify

class TransformationRequest(BaseModel):
  image_url: str
  image_name: str

app = FastAPI()

@app.post("/cartoonify")
async def create_item(request: TransformationRequest):
  task = cartoonify.delay(request.image_url, request.image_name)
  return JSONResponse({"task_id": task.id})
