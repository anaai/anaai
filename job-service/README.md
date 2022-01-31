# Job Service
Job service is used for managing job requests and triggering image generation
celery jobs. It is connected to Postgres and Redis.
When a job request is received, the service will store the job request in
postgres and put a message into redis (message queue).

## Requirements
1. Docker
2. docker-compose

## Setup
* `docker build -t job-service .`

## Running in isolation
* `docker-compose up redis postgres job-service`

## Running tests
* `docker run job-service:latest python -m pytest tests`

## Running examples
Start the service and:
1. `./scripts/trigger_job.sh`

## Migrations
Migrations are generated, managed and ran using
[Alembic](https://alembic.sqlalchemy.org/en/latest/)

### Generating new migrations
1. Update or create new models in `models.py`
2. `alembic revision --autogenerate -m "Message"`

This will generate a new migration in `alembic/versions/`. It is good practice
to always check them before applying.

### Applying migrations
`alembic upgrade head`

### Generating zero state migrations (not needed anymore)
One problem we have is that `Celery` will generate tables for `Tasks` and
`TaskSets`. `Celery` runs migrations when first task is finished.

There is no nice way to generate migrations to match the state in
the db. The solution was:
1. Create models for celery tables in `models.py` (copied from `Celery` source
   code)
2. Generate migrations on existing db with existing `Celery` tables
3. The result should be an empty migration (no changes)
4. Generate the same migrations on a new (empty db)
5. In the original db with `Celery` tables run `alembic stamp head` - to mark
   the last migration as current

Source: [Zero state
migrations](https://stackoverflow.com/questions/52121596/creating-zero-state-migration-for-existing-db-with-sqlalchemy-alembic-and-fak)
