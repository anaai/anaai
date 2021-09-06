import numpy as np
import cv2
from colour import Color
from PIL import Image, ImageDraw, ImageFont

CHARS = np.asarray(list(" .,:irs?@9B&#"))
PIXEL_SAMPLING_RATE = 0.1
GCF = 2 # contrast adjustment

class ASCIIArt:
  def __init__(self, chars=CHARS, color_min="green", color_max="pink",
               bgcolor="white", pixel_sampling_rate=PIXEL_SAMPLING_RATE, gcf=GCF):
    self.chars = chars
    self.color_min = color_min
    self.color_max = color_max
    self.bgcolor = bgcolor

    self.pixel_sampling_rate = pixel_sampling_rate
    self.gcf = gcf # contrast adjustment

    self.font = ImageFont.load_default()

    self.char_width = self.font.getsize("x")[0]
    self.char_height = self.font.getsize("x")[1]

  def transform(self, image):
    image = self._pil_image(image)

    char_ratio = self.char_height / self.char_width
    width_by_char = round(image.size[0] * self.pixel_sampling_rate * char_ratio)
    height_by_char = round(image.size[1] * self.pixel_sampling_rate)

    image = self._preprocess_image(image, width_by_char, height_by_char)
    lines = self._ascii_lines(image)

    nbins = len(lines)
    color_range = list(Color(self.color_min).range_to(Color(self.color_max), nbins))

    ascii_image_width = self.char_width * width_by_char
    ascii_image_height = self.char_height * height_by_char
    ascii_image = Image.new("RGBA", (ascii_image_width, ascii_image_height), self.bgcolor)
    draw = ImageDraw.Draw(ascii_image)

    self._draw_ascii_lines(draw, lines, color_range)

    return self._cv2_image(ascii_image)

  def _preprocess_image(self, image, width_by_char, height_by_char):
    shape = (width_by_char, height_by_char)
    image = image.resize(shape)
    image = np.asarray(image)

    image = cv2.bitwise_not(image)

    image = np.sum(image, axis=2)

    # Normalize the results, enhance and reduce the brightness contrast.
    image -= image.min()
    # Map grayscale values to bins of symbols
    image = (1.0 - image / image.max()) ** self.gcf * (self.chars.size - 1)

    return image

  def _ascii_lines(self, image):
    return ["".join(r) for r in self.chars[image.astype(int)]]

  def _draw_ascii_lines(self, draw, lines, color_range):
    left_padding=0
    y = 0

    for idx, line in enumerate(lines):
      color = color_range[idx]
      draw.text((left_padding, y), line, color.hex, font=self.font)
      y += self.char_height

  def _pil_image(self, image):
    return Image.fromarray(image)

  def _cv2_image(self, image):
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
