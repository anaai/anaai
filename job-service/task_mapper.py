TASK_MAPPINGS = {
  1: "tasks.cartoonify",
  2: "tasks.ascii",
  3: "tasks.sketch"
}

def task_name(transformation_id):
  return TASK_MAPPINGS[transformation_id]

def transformation_name(transformation_id):
  task_name = TASK_MAPPINGS[transformation_id]
  transformation_name = task_name.split(".")[-1]
  return transformation_name
