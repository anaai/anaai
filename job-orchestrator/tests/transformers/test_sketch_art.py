import pytest
import cv2
import numpy as np

from transformers.sketch_art import SketchArt

@pytest.fixture
def sketch_art():
  return SketchArt()

def test_sketch_image_type(sketch_art):
  image = cv2.imread("tests/original.jpeg")

  sketch_image = sketch_art.transform(image)
  assert type(sketch_image) == np.ndarray

def test_sketch_image_shape(sketch_art):
  image = cv2.imread("tests/original.jpeg")

  sketch_image = sketch_art.transform(image)
  assert sketch_image.shape == (1300, 867)
