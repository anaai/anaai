TASK_MAPPINGS = {
  1: "tasks.ascii",
  2: "tasks.candy",
  3: "tasks.mosaic",
  4: "tasks.the_scream",
  5: "tasks.udnie",
  6: "tasks.celeba_distill",
  7: "tasks.face_paint",
  8: "tasks.paprika"
}

def task_name(transformation_id):
  return TASK_MAPPINGS[transformation_id]

def transformation_name(transformation_id):
  task_name = TASK_MAPPINGS[transformation_id]
  transformation_name = task_name.split(".")[-1]
  return transformation_name
