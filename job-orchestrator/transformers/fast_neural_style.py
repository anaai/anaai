import cv2
import imutils

IMAGE_WIDTH = 600
RED_MEAN = 103.939
GREEN_MEAN = 116.779
BLUE_MEAN = 123.680

class FastNeuralStyle:
  def __init__(self, model_path):
    self.model = cv2.dnn.readNetFromTorch(model_path)

  def transform(self, image):
    blob = self._prepare_blob(image)

    self.model.setInput(blob)
    output = self.model.forward()
    stylized_image = self._postprocess_output(output)

    return stylized_image

  def _prepare_blob(self, image):
    image = imutils.resize(image, width=IMAGE_WIDTH)
    (h, w) = image.shape[:2]

    return cv2.dnn.blobFromImage(
      image,
      1.0,
      (w, h),
      (RED_MEAN, GREEN_MEAN, BLUE_MEAN),
      swapRB=False,
      crop=False
    )

  def _postprocess_output(self, image):
    output = image.reshape((3, image.shape[2], image.shape[3]))
    output[0] += RED_MEAN
    output[1] += GREEN_MEAN
    output[2] += BLUE_MEAN
    return output.transpose(1, 2, 0)
