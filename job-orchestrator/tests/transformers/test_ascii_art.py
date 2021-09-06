import pytest
import cv2
import numpy as np

from transformers.ascii_art import ASCIIArt

@pytest.fixture
def ascii_art():
  return ASCIIArt()

def test_object_default_params(ascii_art):
  assert ascii_art.color_min == "green"
  assert ascii_art.color_max == "pink"
  assert ascii_art.bgcolor == "white"
  assert ascii_art.pixel_sampling_rate == 0.1
  assert ascii_art.gcf == 2
  np.testing.assert_array_equal(ascii_art.chars, np.asarray(list(" .,:irs?@9B&#")))

def test_ascii_image_type(ascii_art):
  image = cv2.imread("tests/original.jpeg")

  ascii_image = ascii_art.transform(image)
  assert type(ascii_image) == np.ndarray

def test_ascii_image_shape(ascii_art):
  image = cv2.imread("tests/original.jpeg")

  ascii_image = ascii_art.transform(image)
  assert ascii_image.shape == (1430, 954, 3)
