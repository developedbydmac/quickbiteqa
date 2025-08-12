// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Custom command for login functionality
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[name="email"], input[type="email"]').type(email)
  cy.get('input[name="password"], input[type="password"]').type(password)
  cy.get('button[type="submit"], button').contains(/log.*in/i).click()
  
  // Assert that login was successful by checking for token in localStorage
  cy.window().its('localStorage').should('have.property', 'qb_token')
})

export { }
