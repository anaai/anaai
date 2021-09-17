describe('My First Test', () => {
  const BASE_URL = Cypress.env("base_url");

  it('Does not do much!', () => {
    cy.visit(BASE_URL);
    cy.contains('ANA');
  });
});
