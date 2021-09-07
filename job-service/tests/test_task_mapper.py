import pytest
import task_mapper

def test_supported_transformations():
  assert len(task_mapper.TASK_MAPPINGS) == 3
  assert task_mapper.TASK_MAPPINGS[1] == "tasks.cartoonify"
  assert task_mapper.TASK_MAPPINGS[2] == "tasks.ascii"
  assert task_mapper.TASK_MAPPINGS[3] == "tasks.sketch"

def test_task_name_for_existing_transformation():
  assert task_mapper.task_name(1) == "tasks.cartoonify"

def test_task_name_for_nonexisting_transformation():
  with pytest.raises(KeyError):
    task_mapper.task_name(15)
