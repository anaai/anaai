import requests
import json

PIN_IMAGE_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"
PIN_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

class PinataClient:
  def __init__(self, jwt):
    self.headers = {"Authorization": f"Bearer {jwt}"}

  def pin_image(self, image_path):
    files = self._files(image_path)
    return requests.post(PIN_IMAGE_URL, headers=self.headers, files=files)

  def pin_metadata(self, file_path):
    data = self._json_data(file_path)
    return requests.post(PIN_JSON_URL, headers=self.headers, json=data)

  def _files(self, image_path):
    return {"file": open(image_path, "rb")}

  def _json_data(self, file_path):
    with open(file_path) as f:
      data = json.load(f)

    return data