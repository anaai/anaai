docker-compose up -d
./wait-for-it.sh localhost:8000 -t 300 && yarn run cypress run --spec "cypress/integration/*"
docker-compose down
