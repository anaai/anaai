import pytest
import cv2
import numpy as np

from transformers.fast_neural_style import FastNeuralStyle

MODEL_PATH = "models/feathers.t7"

@pytest.fixture
def fast_neural_style():
  return FastNeuralStyle(MODEL_PATH)

def test_stylized_image_type(fast_neural_style):
  image = cv2.imread("tests/original.jpeg")

  stylized_image = fast_neural_style.transform(image)
  assert type(stylized_image) == np.ndarray

def test_stylized_image_shape(fast_neural_style):
  image = cv2.imread("tests/original.jpeg")

  stylized_image = fast_neural_style.transform(image)
  assert stylized_image.shape == (900, 600, 3)
