import numpy as np
import cv2
from colour import Color
from PIL import Image, ImageDraw, ImageFont

CHARS = np.asarray(list(" .,:irs?@9B&#"))

class ASCIIArt:
  def __init__(self, chars=CHARS, color_min="green", color_max="pink", bgcolor="white"):
    self.chars = chars
    self.color_min = color_min
    self.color_max = color_max
    self.bgcolor = bgcolor

    self.pixel_sampling_rate = 0.1
    self.GCF = 2 # contrast adjustment

    self.font = ImageFont.load_default()

    self.letter_width = self.font.getsize("x")[0]
    self.letter_height = self.font.getsize("x")[1]


  def transform(self, image):
    image = self._pil_image(image)

    letter_ratio = self.letter_height / self.letter_width

    width_by_letter = round(image.size[0] * self.pixel_sampling_rate * letter_ratio)
    height_by_letter = round(image.size[1] * self.pixel_sampling_rate)

    shape = (width_by_letter, height_by_letter)
    image = image.resize(shape)
    image = np.asarray(image)

    image = cv2.bitwise_not(image)

    image = np.sum(image, axis=2)

    # Normalize the results, enhance and reduce the brightness contrast.
    image -= image.min()
    # Map grayscale values to bins of symbols
    image = (1.0 - image / image.max()) ** self.GCF * (self.chars.size-1)

    lines = self._ascii_lines(image)

    nbins = len(lines)
    color_range =list(Color(self.color_min).range_to(Color(self.color_max), nbins))

    new_image_width= self.letter_width * width_by_letter
    new_image_height = self.letter_height * height_by_letter
    new_image = Image.new("RGBA", (new_image_width, new_image_height), self.bgcolor)
    draw = ImageDraw.Draw(new_image)

    self._draw_ascii_lines(draw, lines, color_range)

    return self._cv2_image(new_image)

  def _ascii_lines(self, image):
    return ["".join(r) for r in self.chars[image.astype(int)]]

  def _draw_ascii_lines(self, draw, lines, color_range):
    left_padding=0
    y = 0

    for idx, line in enumerate(lines):
      color = color_range[idx]
      draw.text((left_padding, y), line, color.hex, font=self.font)
      y += self.letter_height

  def _pil_image(self, image):
    return Image.fromarray(image)

  def _cv2_image(self, image):
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

if __name__=='__main__':
    import sys

    image = Image.open(sys.argv[1])
    aa = ASCIIArt()
    aa.generate(image, "kekseors.png")
