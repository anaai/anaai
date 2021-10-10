TASK_MAPPINGS = {
  1: "tasks.ascii",
  2: "tasks.sketch",
  3: "tasks.candy",
  4: "tasks.feathers"
}

def task_name(transformation_id):
  return TASK_MAPPINGS[transformation_id]

def transformation_name(transformation_id):
  task_name = TASK_MAPPINGS[transformation_id]
  transformation_name = task_name.split(".")[-1]
  return transformation_name
