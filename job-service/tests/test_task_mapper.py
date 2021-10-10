import pytest
import task_mapper

def test_supported_transformations():
  assert len(task_mapper.TASK_MAPPINGS) == 4
  assert task_mapper.TASK_MAPPINGS[1] == "tasks.ascii"
  assert task_mapper.TASK_MAPPINGS[2] == "tasks.sketch"
  assert task_mapper.TASK_MAPPINGS[3] == "tasks.candy"
  assert task_mapper.TASK_MAPPINGS[4] == "tasks.feathers"

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
