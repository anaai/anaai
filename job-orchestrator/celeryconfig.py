import os

broker_url = os.getenv("BROKER_URL")
result_backend = os.getenv("POSTGRES_CONNECTION_URL")

task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
timezone = 'Europe/Oslo'
enable_utc = True
