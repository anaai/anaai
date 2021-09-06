import pytest
from unittest.mock import patch, ANY
from pinata import requests
import json

from pinata import PinataClient, PIN_IMAGE_URL, PIN_JSON_URL

@pytest.fixture
def client():
  return PinataClient("jwt")

def test_object_creation(client):
  assert client.headers == {"Authorization": "Bearer jwt"}

@patch("pinata.requests.post")
def test_pin_image(post_mock, client):
  post_mock().json.return_value = {"IpfsHash": "hash123"}

  headers = {"Authorization": "Bearer jwt"}

  image_path = "tests/original.jpeg"
  files = {"file": ANY}

  image_url = client.pin_image(image_path)

  post_mock.assert_called_with(PIN_IMAGE_URL, headers=headers, files=files)
  assert image_url == "https://gateway.pinata.cloud/ipfs/hash123"

@patch("pinata.requests.post")
def test_pin_metadata(post_mock, client):
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

  metadata_url = client.pin_metadata(image_url, name)

  post_mock.assert_called_with(PIN_JSON_URL, headers=headers, json=data)
  assert metadata_url == "https://gateway.pinata.cloud/ipfs/hash123"
