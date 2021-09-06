from unittest.mock import patch, ANY
import numpy as np
import cv2

from tasks import _download_image, cartoonify, ascii

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_cartoonification(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  image_url = "image_url"
  image_name = "image_name"
  image_path = "image_path"
  image_ipfs_url = "pinata_hash_123"
  metadata_ipfs_url = "pinata_hash_365"
  recipient = "recipient"
  payer = "payer"
  price = 0

  dir_mock.local_file_path.return_value = image_path
  pinata_mock().pin_image.return_value = image_ipfs_url
  pinata_mock().pin_metadata.return_value = metadata_ipfs_url

  original_image = cv2.imread("tests/original.jpeg")
  download_mock.return_value = original_image

  status = cartoonify(recipient, payer, price, image_url, image_name)

  # 1. Download the image
  download_mock.assert_called_with(image_url)
  # 2. Create a file path on the tmp file system
  dir_mock.local_file_path.assert_called_with(f"{image_name}.jpg")
  # 3. Store the image locally
  cv2_mock.imwrite.assert_called_with(image_path, ANY)
  # 4. Upload the image to pinata
  pinata_mock().pin_image.assert_called_with(image_path)
  # 5. Upload nft metadata to pinata
  pinata_mock().pin_metadata.assert_called_with(image_ipfs_url, image_name)
  # 6. Remove image from the tmp file system
  dir_mock.remove_file.assert_called_with(image_path)
  # 7. Post nft
  requests_mock.post.assert_called_with(
    ANY,
    json = {"recipient": recipient,
            "payer": payer,
            "token_uri": metadata_ipfs_url,
            "price": price}
  )

@patch("tasks.requests")
@patch("tasks.cv2")
@patch("tasks.working_directory", return_value="image_path.jpg")
@patch("tasks.PinataClient")
@patch("tasks._download_image")
def test_ascii(download_mock, pinata_mock, dir_mock, cv2_mock, requests_mock):
  image_url = "image_url"
  image_name = "image_name"
  image_path = "image_path"
  image_ipfs_url = "pinata_hash_123"
  metadata_ipfs_url = "pinata_hash_365"
  recipient = "recipient"
  payer = "payer"
  price = 0

  dir_mock.local_file_path.return_value = image_path
  pinata_mock().pin_image.return_value = image_ipfs_url
  pinata_mock().pin_metadata.return_value = metadata_ipfs_url

  original_image = cv2.imread("tests/original.jpeg")
  download_mock.return_value = original_image

  status = ascii(recipient, payer, price, image_url, image_name)

  # 1. Download the image
  download_mock.assert_called_with(image_url)
  # 2. Create a file path on the tmp file system
  dir_mock.local_file_path.assert_called_with(f"{image_name}.jpg")
  # 3. Store the image locally
  cv2_mock.imwrite.assert_called_with(image_path, ANY)
  # 4. Upload the image to pinata
  pinata_mock().pin_image.assert_called_with(image_path)
  # 5. Upload nft metadata to pinata
  pinata_mock().pin_metadata.assert_called_with(image_ipfs_url, image_name)
  # 6. Remove image from the tmp file system
  dir_mock.remove_file.assert_called_with(image_path)
  # 7. Post nft
  requests_mock.post.assert_called_with(
    ANY,
    json = {"recipient": recipient,
            "payer": payer,
            "token_uri": metadata_ipfs_url,
            "price": price}
  )
