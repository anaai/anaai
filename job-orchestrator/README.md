# Job Orchestrator
Job orchestrator for running background jobs for generating images.
Job orchestrator reads messages from redis (message queue), and triggers jobs.
When the jobs are finished, the state and some metadata are stored in postgres.

### Requirements
1. Docker
2. docker-compose

### Setup
* `docker build -t job-orchestrator .`

## Running in isolation
* `docker-compose up redis postgres job-orchestrator`

## Running tests
* `docker run job-orchestrator:latest python -m pytest tests`
