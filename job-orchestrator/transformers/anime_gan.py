import cv2
import numpy as np
import imutils

import torch
from torch import nn
import torch.nn.functional as F

torch.backends.cudnn.enabled = False
torch.backends.cudnn.benchmark = False
torch.backends.cudnn.deterministic = True

DEVICE = "cpu"
UPSAMPLE_ALIGN = False
IMAGE_WIDTH = 1200

class AnimeGAN():
  def __init__(self, model_path):
    self.net = Generator()
    self.net.load_state_dict(torch.load(model_path, map_location="cpu"))
    self.net.to(DEVICE).eval()

  def transform(self, image):
    image = self._preprocess_image(image)

    with torch.no_grad():
      image = image.permute(2, 0, 1).unsqueeze(0).to(DEVICE)
      animated_image = self.net(image, UPSAMPLE_ALIGN).squeeze(0).permute(1, 2, 0).cpu().numpy()
      animated_image = self._postprocess_image(animated_image)

    return animated_image

  def _preprocess_image(self, image):
    image = imutils.resize(image, width=IMAGE_WIDTH)
    image = image.astype(np.float32)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    h, w = image.shape[:2]

    image = torch.from_numpy(image)
    image = self._scale_image(image)
    return image

  def _postprocess_image(self, image):
    output = (image + 1) * 127.5
    output = np.clip(output, 0, 255).astype(np.uint8)
    return cv2.cvtColor(output, cv2.COLOR_BGR2RGB)

  def _scale_image(self, image):
    return image / 127.5 - 1.0

class ConvNormLReLU(nn.Sequential):
  def __init__(self, in_ch, out_ch,
               kernel_size=3,
               stride=1,
               padding=1,
               pad_mode="reflect",
               groups=1,
               bias=False):

    pad_layer = {
        "zero":    nn.ZeroPad2d,
        "same":    nn.ReplicationPad2d,
        "reflect": nn.ReflectionPad2d,
    }
    if pad_mode not in pad_layer:
        raise NotImplementedError

    super(ConvNormLReLU, self).__init__(
      pad_layer[pad_mode](padding),
      nn.Conv2d(in_ch, out_ch, kernel_size=kernel_size, stride=stride,
                padding=0, groups=groups, bias=bias),
      nn.GroupNorm(num_groups=1, num_channels=out_ch, affine=True),
      nn.LeakyReLU(0.2, inplace=True)
    )

class InvertedResBlock(nn.Module):
  def __init__(self, in_ch, out_ch, expansion_ratio=2):
    super(InvertedResBlock, self).__init__()

    self.use_res_connect = in_ch == out_ch
    bottleneck = int(round(in_ch*expansion_ratio))
    layers = []
    if expansion_ratio != 1:
      layers.append(ConvNormLReLU(in_ch, bottleneck, kernel_size=1, padding=0))

    # dw
    layers.append(ConvNormLReLU(bottleneck, bottleneck, groups=bottleneck, bias=True))
    # pw
    layers.append(nn.Conv2d(bottleneck, out_ch, kernel_size=1, padding=0, bias=False))
    layers.append(nn.GroupNorm(num_groups=1, num_channels=out_ch, affine=True))

    self.layers = nn.Sequential(*layers)

  def forward(self, input):
    out = self.layers(input)
    if self.use_res_connect:
      out = input + out
    return out

class Generator(nn.Module):
  def __init__(self, ):
    super().__init__()

    self.block_a = nn.Sequential(
      ConvNormLReLU(3,  32, kernel_size=7, padding=3),
      ConvNormLReLU(32, 64, stride=2, padding=(0,1,0,1)),
      ConvNormLReLU(64, 64)
    )

    self.block_b = nn.Sequential(
      ConvNormLReLU(64,  128, stride=2, padding=(0,1,0,1)),
      ConvNormLReLU(128, 128)
    )

    self.block_c = nn.Sequential(
      ConvNormLReLU(128, 128),
      InvertedResBlock(128, 256, 2),
      InvertedResBlock(256, 256, 2),
      InvertedResBlock(256, 256, 2),
      InvertedResBlock(256, 256, 2),
      ConvNormLReLU(256, 128),
    )

    self.block_d = nn.Sequential(
      ConvNormLReLU(128, 128),
      ConvNormLReLU(128, 128)
    )

    self.block_e = nn.Sequential(
      ConvNormLReLU(128, 64),
      ConvNormLReLU(64,  64),
      ConvNormLReLU(64,  32, kernel_size=7, padding=3)
    )

    self.out_layer = nn.Sequential(
      nn.Conv2d(32, 3, kernel_size=1, stride=1, padding=0, bias=False),
      nn.Tanh()
    )

  def forward(self, input, align_corners=True):
    out = self.block_a(input)
    half_size = out.size()[-2:]
    out = self.block_b(out)
    out = self.block_c(out)

    if align_corners:
      out = F.interpolate(out, half_size, mode="bilinear", align_corners=True)
    else:
      out = F.interpolate(out, scale_factor=2, mode="bilinear", align_corners=False)

    out = self.block_d(out)

    if align_corners:
      out = F.interpolate(out, input.size()[-2:], mode="bilinear", align_corners=True)
    else:
      out = F.interpolate(out, scale_factor=2, mode="bilinear", align_corners=False)

    out = self.block_e(out)

    out = self.out_layer(out)
    return out
