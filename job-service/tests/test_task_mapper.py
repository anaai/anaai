import pytest
import task_mapper

def test_supported_transformations():
  assert len(task_mapper.TASK_MAPPINGS) == 5
  assert task_mapper.TASK_MAPPINGS[1] == "tasks.cartoonify"
  assert task_mapper.TASK_MAPPINGS[2] == "tasks.ascii"
  assert task_mapper.TASK_MAPPINGS[3] == "tasks.sketch"
  assert task_mapper.TASK_MAPPINGS[4] == "tasks.candy"
  assert task_mapper.TASK_MAPPINGS[5] == "tasks.feathers"

def test_task_name_for_existing_transformation():
  assert task_mapper.task_name(1) == "tasks.cartoonify"

def test_task_name_for_nonexisting_transformation():
  with pytest.raises(KeyError):
    task_mapper.task_name(15)

def test_transformation_name_for_existing_transformation():
  assert task_mapper.transformation_name(1) == "cartoonify"

def test_transformation_name_for_nonexisting_transformation():
  with pytest.raises(KeyError):
    task_mapper.transformation_name(15)
