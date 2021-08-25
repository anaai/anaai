import cv2
import numpy as np

class Cartoonifier:
  def __init__(self, line_size=7, blur_value=7, n_colors=8):
    self.line_size = line_size
    self.blur_value = blur_value
    self.n_colors = n_colors

  def cartoonify(self, image):
    edges = self._edge_mask(image)
    reduced_color_image = self._reduce_colors(image)
    blured_image = self._reduce_noise(image)
    cartoonified_image = self._add_edges(blured_image, edges)

    return cartoonified_image

  def _edge_mask(self, image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray_blur = cv2.medianBlur(gray, self.blur_value)
    edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C,
                                  cv2.THRESH_BINARY, self.line_size, self.blur_value)
    return edges

  def _reduce_colors(self, image):
    data = np.float32(image).reshape((-1, 3))
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.001)

    _, label, center = cv2.kmeans(data, self.n_colors, None,
                                  criteria, 10, cv2.KMEANS_RANDOM_CENTERS)

    center = np.uint8(center)
    reduced_color_image = center[label.flatten()]
    reduced_color_image = reduced_color_image.reshape(image.shape)

    return reduced_color_image

  def _reduce_noise(self, image):
    return cv2.bilateralFilter(image, d=10, sigmaColor=250,sigmaSpace=250)

  def _add_edges(self, image, edges):
    return cv2.bitwise_and(image, image, mask=edges)
