# End to end tests
End to end tests for the whole platform. We are using [Cypress](https://www.cypress.io/) as our e2e testing framework.

## Setup
`yarn install`

## Opening cypress application
`yarn run cypress open`

## Running tests
1. All - `yarn run cypress run --spec "cypress/integration/**"`
2. Specific test case - `yarn run cypress run --spec
   "cypress/integration/spec.js`

## End to end testing philosophy
