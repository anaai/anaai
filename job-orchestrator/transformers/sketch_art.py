import numpy as np
import cv2

class SketchArt:
  def __init__(self):
    pass

  def transform(self, image):
    grayed = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    inverted = cv2.bitwise_not(grayed)
    blurred = cv2.GaussianBlur(inverted, (19, 19), sigmaX=0, sigmaY=0)

    sketch = self._blend(grayed, blurred)
    return sketch

  def _blend(self, x, y):
    return cv2.divide(x, 255 - y, scale=256)
