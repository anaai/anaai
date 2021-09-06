import pytest
import cv2
import numpy as np

from transformers.cartoonification import Cartoonifier

@pytest.fixture
def cartoonifier():
  return Cartoonifier()

def test_object_default_params(cartoonifier):
  assert cartoonifier.line_size == 7
  assert cartoonifier.blur_value == 7
  assert cartoonifier.n_colors == 8

def test_cartoonified_image_type(cartoonifier):
  image = cv2.imread("tests/original.jpeg")

  cartoonified_image = cartoonifier.transform(image)
  assert type(cartoonified_image) == np.ndarray

def test_cartoonified_image_shape(cartoonifier):
  image = cv2.imread("tests/original.jpeg")

  cartoonified_image = cartoonifier.transform(image)
  assert image.shape == cartoonified_image.shape
