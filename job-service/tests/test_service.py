from fastapi.testclient import TestClient
from unittest.mock import patch, ANY

from service import app
from database import get_session
from models import JobRequest
from tests.test_database import override_get_session, TestingSessionLocal, test_db

app.dependency_overrides[get_session] = override_get_session
client = TestClient(app)

@patch("service.celery_app")
def test_cartoonify_response(celery_mock, test_db):
  task_id = "555333"
  celery_mock.send_task.return_value.id = task_id

  response = client.post("/cartoonify", json={"image_url": "", "image_name": "", "payer": ""})

  assert response.status_code == 200
  assert response.json() == {"task_id": task_id}

@patch("service.celery_app")
def test_cartoonify_task_invocation(celery_mock, test_db):
  url = "url"
  name = "name"
  payer = "payer"
  price = 0
  celery_mock.send_task.return_value.id = "555333"

  response = client.post("/cartoonify", json={"image_url": url, "image_name": name, "payer": payer})

  celery_mock.send_task.assert_called_with("tasks.cartoonify", [ANY, payer, price, url, name])

@patch("service.celery_app")
def test_job_request_in_db(celery_mock, test_db):
  task_id = "555333"
  url = "url"
  name = "name"
  payer = "payer"
  price = 0
  celery_mock.send_task.return_value.id = task_id

  response = client.post("/cartoonify", json={"image_url": url, "image_name": name, "payer": payer})

  session = TestingSessionLocal()
  job_request = session.query(JobRequest).order_by(JobRequest.id.desc()).first()

  assert job_request.job_request_hash == name
  assert job_request.payer == payer
  assert job_request.task_id == task_id
