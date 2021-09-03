from sqlalchemy.orm import Session

import models

def create_job_request(session, job_request):
  db_job_request = models.JobRequest(job_request_hash=job_request.image_name,
                                     transformation=job_request.transformation,
                                     payer=job_request.payer)
  session.add(db_job_request)
  session.commit()
  session.refresh(db_job_request)

  return db_job_request

def add_task_to_job_request(session, db_job_request, task_id):
  db_job_request.task_id = task_id

  session.add(db_job_request)
  session.commit()
  session.refresh(db_job_request)

  return db_job_request
