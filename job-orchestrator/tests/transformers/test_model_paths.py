from transformers import model_paths

def test_candy_model():
  assert model_paths.CANDY_FAST_NEURAL_TRANSFER_MODEL == "models/candy.t7"

def test_feathers_model():
  assert model_paths.FEATHERS_FAST_NEURAL_TRANSFER_MODEL == "models/feathers.t7"
