import unittest
import cv2
import numpy as np

from cartoonification import Cartoonifier

class CartoonificationTestCase(unittest.TestCase):
  @classmethod
  def setUpClass(cls):
    cls.c = Cartoonifier()

  def test_object_creation(self):
    self.assertIsInstance(self.c, Cartoonifier)

  def test_object_default_params(self):
    self.assertEqual(7, self.c.line_size)
    self.assertEqual(7, self.c.blur_value)
    self.assertEqual(8, self.c.n_colors)

  def test_cartoonified_image_type(self):
    image = cv2.imread("tests/original.jpeg")

    cartoonified_image = self.c.transform(image)
    self.assertIsInstance(cartoonified_image, np.ndarray)

  def test_cartoonified_image_shape(self):
    image = cv2.imread("tests/original.jpeg")

    cartoonified_image = self.c.transform(image)
    self.assertEqual(image.shape, cartoonified_image.shape)
