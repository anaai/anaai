import unittest
import cv2
import numpy as np

from ascii_art import ASCIIArt

class ASCIIArtTestCase(unittest.TestCase):
  @classmethod
  def setUpClass(cls):
    cls.a = ASCIIArt()

  def test_object_creation(self):
    self.assertIsInstance(self.a, ASCIIArt)

  def test_object_default_params(self):
    self.assertEqual(self.a.color_min, "green")
    self.assertEqual(self.a.color_max, "pink")
    self.assertEqual(self.a.bgcolor, "white")
    np.testing.assert_array_equal(self.a.chars, np.asarray(list(" .,:irs?@9B&#")))

  def test_ascii_image_type(self):
    image = cv2.imread("tests/original.jpeg")

    ascii_image = self.a.transform(image)
    self.assertIsInstance(ascii_image, np.ndarray)

  def test_ascii_image_shape(self):
    image = cv2.imread("tests/original.jpeg")

    ascii_image = self.a.transform(image)
    self.assertEqual(ascii_image.shape, (1430, 954, 3))
