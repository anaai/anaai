from unittest import TestCase
from unittest.mock import patch, ANY
import numpy as np
import cv2

from tasks import _download_image, cartoonify

class TasksTestCase(TestCase):
  @patch("tasks.cv2")
  @patch("tasks.working_directory", return_value="image_path.jpg")
  @patch("tasks.PinataClient")
  @patch("tasks._download_image")
  def test_cartoonification(self, download_mock, pinata_mock, dir_mock, cv2_mock):
    image_url = "image_url"
    image_name = "image_name"
    image_path = "image_path"

    dir_mock.local_file_path.return_value = image_path

    original_image = cv2.imread("tests/original.jpeg")
    download_mock.return_value = original_image

    status = cartoonify(image_url, image_name)

    # 1. Download the image
    download_mock.assert_called_with(image_url)
    # 2. Create a file path on the tmp file system
    dir_mock.local_file_path.assert_called_with(image_name)
    # 3. Store the image locally
    cv2_mock.imwrite.assert_called_with(image_path, ANY)
    # 4. Upload the image to pinata
    pinata_mock().pin_image.assert_called_with(image_path)
    # 5. Remove image from the tmp file system
    dir_mock.remove_file.assert_called_with(image_path)
