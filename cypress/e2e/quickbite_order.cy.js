describe('QuickBite Order Flow', () => {
  beforeEach(() => {
    // Clear any existing state
    cy.clearLocalStorage()
  })

  it('should complete full order flow with login', () => {
    // Login using custom command
    cy.login(Cypress.env('TEST_USER'), Cypress.env('TEST_PASS'))
    
    // Visit the menu page
    cy.visit('/menu')
    
    // Add first two items to cart
    cy.get('[data-testid="add-to-cart"], button').contains(/add/i).first().click()
    cy.wait(500) // Allow for state update
    
    cy.get('[data-testid="add-to-cart"], button').contains(/add/i).eq(1).click()
    cy.wait(500)
    
    // Navigate to order/cart page
    cy.visit('/cart')
    // Alternative navigation methods
    cy.get('a').contains(/cart|order/i).click({ force: true })
      .or(() => cy.get('[data-testid="cart-link"]').click())
    
    // Verify subtotal is greater than 0
    cy.get('[data-testid="subtotal"], .subtotal').should('contain', '$')
    cy.get('[data-testid="total"], .total, .subtotal').invoke('text').then((text) => {
      const amount = parseFloat(text.replace(/[^0-9.]/g, ''))
      expect(amount).to.be.greaterThan(0)
    })
    
    // Click Place Order button
    cy.get('button').contains(/place.*order|checkout|confirm/i).click()
    
    // Expect success message
    cy.get('[data-testid="success"], .success, .alert-success').should('be.visible')
      .or(() => cy.contains(/success|confirmed|placed/i).should('be.visible'))
  })

  it('should handle order without login (should redirect or show error)', () => {
    cy.visit('/menu')
    
    // Try to add item without login
    cy.get('[data-testid="add-to-cart"], button').contains(/add/i).first().click()
    
    // Should either redirect to login or show some indication
    cy.url().should('include', '/login')
      .or(() => cy.contains(/login|sign.*in/i).should('be.visible'))
  })
})
