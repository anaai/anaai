## Kripto Hans Service

Service for making transformations to provided images.

### Requirements
1. Docker

### Setup
1. `docker build -t kripto-hans-service .`
2. `docker run -p 8000:8000 kripto-hans-service:latest`

### Running tests
1. `docker run kripto-hans-service:latest python -m pytest tests`

### Running examples
Start the service and:
1. `./scripts/get_status.sh`
2. `./scripts/cartoonify.sh`
