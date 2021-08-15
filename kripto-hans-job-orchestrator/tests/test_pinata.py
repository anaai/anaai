import unittest
from unittest.mock import patch, ANY
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

  @patch("pinata.requests.post")
  def test_pin_image(self, post_mock):
    post_mock().json.return_value = {"IpfsHash": "hash123"}

    headers = {"Authorization": "Bearer jwt"}

    image_path = "tests/original.jpeg"
    files = {"file": ANY}

    image_url = self.c.pin_image(image_path)

    post_mock.assert_called_with(PIN_IMAGE_URL, headers=headers, files=files)
    self.assertEqual("https://gateway.pinata.cloud/ipfs/hash123", image_url)

  @patch("pinata.requests.post")
  def test_pin_metadata(self, post_mock):
    post_mock().json.return_value = {"IpfsHash": "hash123"}

    headers = {"Authorization": "Bearer jwt"}

    image_url = "image_url"
    name = "name"

    metadata_path = "templates/nft-metadata-template.json"
    with open(metadata_path) as f:
      data = json.load(f)
    data["pinataContent"]["image"] = image_url
    data["pinataContent"]["name"] = name
    data["pinataMetadata"]["name"] = name

    metadata_url = self.c.pin_metadata(image_url, name)

    post_mock.assert_called_with(PIN_JSON_URL, headers=headers, json=data)
    self.assertEqual("https://gateway.pinata.cloud/ipfs/hash123", metadata_url)
