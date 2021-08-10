from unittest import TestCase
from unittest.mock import patch
import numpy as np
import cv2

from tasks import _download_image, cartoonify

class TasksTestCase(TestCase):

  @patch("tasks._download_image")
  def test_cartoonification(self, download_mock):
    original_image = cv2.imread("tests/original.jpeg")
    cartoonified_image = cv2.imread("tests/cartoonified.jpeg")
    download_mock.return_value = original_image

    result_shape = cartoonify("lolkekmaxkiki")

    assert result_shape == cartoonified_image.shape
