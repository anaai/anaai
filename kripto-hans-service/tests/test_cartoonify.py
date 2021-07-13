import unittest
import cv2
import numpy as np

from cartoonify import Cartoon

class CartoonificationTestCase(unittest.TestCase):
  @classmethod
  def setUpClass(cls):
    cls.c = Cartoon()

  def test_object_creation(self):
    self.assertIsInstance(self.c, Cartoon)

  def test_object_default_params(self):
    self.assertEqual(7, self.c.line_size)
    self.assertEqual(7, self.c.blur_value)
    self.assertEqual(8, self.c.n_colors)

  def test_cartoonified_image(self):
    image_path = "tests/person1.jpeg"
    image = cv2.imread(image_path)

    cartoonified_image = self.c.cartoonify(image)
    self.assertIsInstance(cartoonified_image, np.ndarray)

  def test_cartoonified_image_shape(self):
    image_path = "tests/person1.jpeg"
    image = cv2.imread(image_path)

    cartoonified_image = self.c.cartoonify(image)
    self.assertEqual(image.shape, cartoonified_image.shape)
