from celery import Celery
from celery.execute import send_task

POSTGRES_URL = "db+postgresql+psycopg2://job_orchestrator:p@localhost:5432/jobs"
BROKER_URL = "redis://localhost:6378/0"

celery_app = Celery("tasks", backend=POSTGRES_URL, broker=BROKER_URL)

transformation_name = "candy"
image_url = "https://upload.wikimedia.org/wikipedia/it/f/fd/Gabumon.png"
image_name = "kikibracala"
payer = "0xc043945B556B526689270d87A7ac58B286F31308"

task = celery_app.send_task("tasks.candy",
                            [transformation_name,
                             payer,
                             image_url,
                             image_name])
print(task)
