# Job Orchestrator
Job orchestrator used for running background jobs that:
1. Generate images
2. Upload images to [IPFS](https://www.pinata.cloud/)
3. Post the new token to be minted to nft service

Job orchestrator is subscribed to redis (message queue), and triggers jobs upon
receiving messages. When the jobs are finished, the state and some metadata are stored in postgres (result database).

### Requirements
1. Docker
2. docker-compose

### Setup
* `docker build -t job-orchestrator .`

## Running in isolation
* `docker-compose up redis postgres job-orchestrator`

## Running tests
* `docker run job-orchestrator:latest python -m pytest tests`

## Trigger a job
`python scripts/run_task.py`
