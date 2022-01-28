import pytest
import task_mapper

def test_supported_transformations():
  assert len(task_mapper.TASK_MAPPINGS) == 8
  assert task_mapper.TASK_MAPPINGS[1] == "tasks.ascii"
  assert task_mapper.TASK_MAPPINGS[2] == "tasks.candy"
  assert task_mapper.TASK_MAPPINGS[3] == "tasks.mosaic"
  assert task_mapper.TASK_MAPPINGS[4] == "tasks.the_scream"
  assert task_mapper.TASK_MAPPINGS[5] == "tasks.udnie"
  assert task_mapper.TASK_MAPPINGS[6] == "tasks.celeba_distill"
  assert task_mapper.TASK_MAPPINGS[7] == "tasks.face_paint"
  assert task_mapper.TASK_MAPPINGS[8] == "tasks.paprika"

def test_task_name_for_existing_transformation():
  assert task_mapper.task_name(1) == "tasks.ascii"

def test_task_name_for_nonexisting_transformation():
  with pytest.raises(KeyError):
    task_mapper.task_name(15)

def test_transformation_name_for_existing_transformation():
  assert task_mapper.transformation_name(1) == "ascii"

def test_transformation_name_for_nonexisting_transformation():
  with pytest.raises(KeyError):
    task_mapper.transformation_name(15)
