from fastapi.testclient import TestClient
from service import app

client = TestClient(app)

def test_status():
  response = client.get("/status")
  assert response.status_code == 200
  assert response.text == '"Service running"'

def test_cartoonify():
  file_path = "tests/person1.jpeg"
  with open(file_path, "rb") as f:
    response = client.post("/cartoonify",
                           files={"image": ("filename", f, "image/jpeg")})
    assert response.status_code == 200
    assert response.headers == {"content-type": "image/png"}
