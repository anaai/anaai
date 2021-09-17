FROM cypress/included:3.2.0

WORKDIR /app

COPY package.json ./
COPY cypress-docker.json ./cypress.json
COPY yarn.lock ./
RUN yarn

COPY wait-for-it.sh ./

COPY cypress/ ./cypress
