TASK_MAPPINGS = {
  1: "tasks.cartoonify",
  2: "tasks.ascii"
}

def task_name(transformation_id):
  return TASK_MAPPINGS[transformation_id]
