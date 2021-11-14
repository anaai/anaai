from transformers import model_paths

def test_candy_model():
  assert model_paths.CANDY_FAST_NEURAL_TRANSFER_MODEL == "models/candy.t7"

def test_feathers_model():
  assert model_paths.FEATHERS_FAST_NEURAL_TRANSFER_MODEL == "models/feathers.t7"

def test_mosaic_model():
  assert model_paths.MOSAIC_FAST_NEURAL_TRANSFER_MODEL == "models/mosaic.t7"

def test_the_scream_model():
  assert model_paths.THE_SCREAM_FAST_NEURAL_TRANSFER_MODEL == "models/the_scream.t7"

def test_udnie_model():
  assert model_paths.UDNIE_FAST_NEURAL_TRANSFER_MODEL == "models/udnie.t7"

def test_celeba_distill_model():
  assert model_paths.CELEBA_DISTILL_ANIME_GAN == "models/celeba_distill.pt"

def test_face_paint_model():
  assert model_paths.FACE_PAINT_ANIME_GAN == "models/face_paint_512_v2.pt"

def test_paprika_model():
  assert model_paths.PAPRIKA_ANIME_GAN == "models/paprika.pt"
