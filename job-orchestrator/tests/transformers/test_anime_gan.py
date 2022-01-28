import pytest
import cv2
import numpy as np

from transformers.anime_gan import AnimeGAN

MODEL_PATH = "models/celeba_distill.pt"

@pytest.fixture
def anime_gan():
  return AnimeGAN(MODEL_PATH)

def test_animated_image_type(anime_gan):
  image = cv2.imread("tests/gril.jpg")

  animated_image = anime_gan.transform(image)
  assert type(animated_image) == np.ndarray

def test_stylized_image_shape(anime_gan):
  image = cv2.imread("tests/gril.jpg")

  animated_image = anime_gan.transform(image)
  assert animated_image.shape == (1628, 1200, 3)
