import unittest
from unittest.mock import MagicMock, ANY
from pinata import requests
import json

from pinata import PinataClient, PIN_IMAGE_URL, PIN_JSON_URL

class PinataClientTestCase(unittest.TestCase):
  @classmethod
  def setUpClass(cls):
    cls.c = PinataClient("jwt")

  def test_object_creation(self):
    self.assertIsInstance(self.c, PinataClient)
    self.assertDictEqual({"Authorization": "Bearer jwt"}, self.c.headers)

  def test_pin_image(self):
    requests.post = MagicMock()

    headers = {"Authorization": "Bearer jwt"}

    image_path = "tests/original.jpeg"
    files = {"file": ANY}

    self.c.pin_image(image_path)

    requests.post.assert_called_with(PIN_IMAGE_URL, headers=headers, files=files)

  def test_pin_metadata(self):
    requests.post = MagicMock()

    headers = {"Authorization": "Bearer jwt"}

    image_url = "image_url"
    name = "name"

    json_path = "templates/nft-metadata-template.json"
    with open(json_path) as f:
      data = json.load(f)
    data["image"] = image_url
    data["name"] = name

    self.c.pin_metadata(json_path, image_url, name)

    requests.post.assert_called_with(PIN_JSON_URL, headers=headers, json=data)
