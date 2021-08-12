from fastapi.testclient import TestClient
from unittest.mock import patch
from service import app

client = TestClient(app)

@patch("service.cartoonify")
def test_cartoonify_response(cartoonify_mock):
  task_id = 555333
  cartoonify_mock.delay.return_value.id = task_id

  response = client.post("/cartoonify", json={"image_url": "", "image_name": ""})

  assert response.status_code == 200
  assert response.json() == {"task_id": task_id}

@patch("service.cartoonify")
def test_cartoonify_task_invocation(cartoonify_mock):
  url = "url"
  name = "name"
  cartoonify_mock.delay.return_value.id = 555333

  response = client.post("/cartoonify", json={"image_url": url, "image_name": name})

  cartoonify_mock.delay.assert_called_with(url, name)
