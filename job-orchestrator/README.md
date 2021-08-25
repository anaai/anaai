## Kripto Hans Job Orchestrator

Job orchestrator for running background jobs for generating images.
Redis is used as a message queue.
Postgres is used as a db for storing job related data.

### Requirements
1. Docker
2. docker-compose

### Setup
* `docker-compose build`

### Running services
* `docker-compose up [--build]`

### Running tests
* `docker run job_orchestrator:latest python -m pytest tests`
