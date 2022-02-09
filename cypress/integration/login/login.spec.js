/// <reference types="cypress" />

describe('My First Test', () => {
  it('visit the Web', () => {
    cy.visit('/login');
  });
});
