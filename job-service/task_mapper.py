TASK_MAPPINGS = {
  1: "tasks.ascii",
  2: "tasks.sketch",
  3: "tasks.candy",
  4: "tasks.feathers",
  5: "tasks.mosaic",
  6: "tasks.the_scream",
  7: "tasks.udnie",
  8: "tasks.celeba_distill",
  9: "tasks.face_paint",
  10: "tasks.paprika"
}

def task_name(transformation_id):
  return TASK_MAPPINGS[transformation_id]

def transformation_name(transformation_id):
  task_name = TASK_MAPPINGS[transformation_id]
  transformation_name = task_name.split(".")[-1]
  return transformation_name
