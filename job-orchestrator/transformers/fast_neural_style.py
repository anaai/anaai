import cv2
import imutils

IMAGE_WIDTH = 600

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
      (103.939, 116.779, 123.680),
      swapRB=False,
      crop=False
    )

  def _postprocess_output(self, image):
    output = image.reshape((3, image.shape[2], image.shape[3]))
    output[0] += 103.939
    output[1] += 116.779
    output[2] += 123.680
    return output.transpose(1, 2, 0)
