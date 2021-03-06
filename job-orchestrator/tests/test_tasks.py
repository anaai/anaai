from unittest.mock import patch, ANY
import numpy as np
import cv2

from tasks import (
  _download_image, ascii, candy, mosaic, the_scream,
  udnie, celeba_distill, face_paint, paprika
)

IMAGE_URL = "image_url"
IMAGE_NAME = "image_name"
IMAGE_PATH = "image_path"
IMAGE_IPFS_URL = "pinata_hash_123"
METADATA_IPFS_URL = "pinata_hash_365"
PAYER = "payer"
TRANSFORMATION_NAME = "sketch"
TRANSFORMATION_NUMBER = 1
TOKEN_NAME = "sketch #1"

def _setup_mocks(dir_mock, pinata_mock, download_mock, original_image):
  dir_mock.local_file_path.return_value = IMAGE_PATH
  pinata_mock().pin_image.return_value = IMAGE_IPFS_URL
  pinata_mock().pin_metadata.return_value = METADATA_IPFS_URL

  download_mock.return_value = original_image

def _assert_call_order_and_params(download_mock, dir_mock, cv2_mock, pinata_mock, requests_mock):
  # 1. Download the image
  download_mock.assert_called_with(IMAGE_URL)
  # 2. Create a file path on the tmp file system
  dir_mock.local_file_path.assert_called_with(f"{IMAGE_NAME}.jpg")
  # 3. Store the image locally
  cv2_mock.imwrite.assert_called_with(IMAGE_PATH, ANY)
  # 4. Upload the image to pinata
  pinata_mock().pin_image.assert_called_with(IMAGE_PATH)
  # 5. Upload nft metadata to pinata
  pinata_mock().pin_metadata.assert_called_with(IMAGE_IPFS_URL, TOKEN_NAME,
                                                PAYER, TRANSFORMATION_NAME)
  # 6. Remove image from the tmp file system
  dir_mock.remove_file.assert_called_with(IMAGE_PATH)
  # 7. Post nft
  requests_mock.post.assert_called_with(
    ANY,
    json = {"payer": PAYER, "token_uri": METADATA_IPFS_URL}
  )

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_ascii(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  original_image = cv2.imread("tests/original.jpeg")

  _setup_mocks(dir_mock, pinata_mock, download_mock, original_image)

  status = ascii(TRANSFORMATION_NAME, TRANSFORMATION_NUMBER, PAYER, IMAGE_URL, IMAGE_NAME)

  _assert_call_order_and_params(download_mock, dir_mock, cv2_mock, pinata_mock, requests_mock)

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_candy(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  original_image = cv2.imread("tests/original.jpeg")

  _setup_mocks(dir_mock, pinata_mock, download_mock, original_image)

  status = candy(TRANSFORMATION_NAME, TRANSFORMATION_NUMBER, PAYER, IMAGE_URL, IMAGE_NAME)

  _assert_call_order_and_params(download_mock, dir_mock, cv2_mock, pinata_mock, requests_mock)

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_mosaic(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  original_image = cv2.imread("tests/original.jpeg")

  _setup_mocks(dir_mock, pinata_mock, download_mock, original_image)

  status = mosaic(TRANSFORMATION_NAME, TRANSFORMATION_NUMBER, PAYER, IMAGE_URL, IMAGE_NAME)

  _assert_call_order_and_params(download_mock, dir_mock, cv2_mock, pinata_mock, requests_mock)

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_the_scream(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  original_image = cv2.imread("tests/original.jpeg")

  _setup_mocks(dir_mock, pinata_mock, download_mock, original_image)

  status = the_scream(TRANSFORMATION_NAME, TRANSFORMATION_NUMBER, PAYER, IMAGE_URL, IMAGE_NAME)

  _assert_call_order_and_params(download_mock, dir_mock, cv2_mock, pinata_mock, requests_mock)

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_udnie(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  original_image = cv2.imread("tests/original.jpeg")

  _setup_mocks(dir_mock, pinata_mock, download_mock, original_image)

  status = udnie(TRANSFORMATION_NAME, TRANSFORMATION_NUMBER, PAYER, IMAGE_URL, IMAGE_NAME)

  _assert_call_order_and_params(download_mock, dir_mock, cv2_mock, pinata_mock, requests_mock)

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_celeba_distill(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  original_image = cv2.imread("tests/gril.jpg")

  _setup_mocks(dir_mock, pinata_mock, download_mock, original_image)

  status = celeba_distill(TRANSFORMATION_NAME, TRANSFORMATION_NUMBER, PAYER, IMAGE_URL, IMAGE_NAME)

  _assert_call_order_and_params(download_mock, dir_mock, cv2_mock, pinata_mock, requests_mock)

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_face_paint(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  original_image = cv2.imread("tests/gril.jpg")

  _setup_mocks(dir_mock, pinata_mock, download_mock, original_image)

  status = face_paint(TRANSFORMATION_NAME, TRANSFORMATION_NUMBER, PAYER, IMAGE_URL, IMAGE_NAME)

  _assert_call_order_and_params(download_mock, dir_mock, cv2_mock, pinata_mock, requests_mock)

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_paprika(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  original_image = cv2.imread("tests/gril.jpg")

  _setup_mocks(dir_mock, pinata_mock, download_mock, original_image)

  status = paprika(TRANSFORMATION_NAME, TRANSFORMATION_NUMBER, PAYER, IMAGE_URL, IMAGE_NAME)

  _assert_call_order_and_params(download_mock, dir_mock, cv2_mock, pinata_mock, requests_mock)
