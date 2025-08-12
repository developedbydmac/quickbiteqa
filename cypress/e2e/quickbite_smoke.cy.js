describe('QuickBite Smoke Tests', () => {
  it('should load the home page successfully', () => {
    cy.visit('/')
    cy.contains('QuickBite').should('be.visible')
    cy.get('body').should('be.visible')
  })

  it('should navigate to menu page and show items', () => {
    cy.visit('/')
    
    // Navigate to menu page (could be via nav link or direct visit)
    cy.visit('/menu')
    
    // Assert the menu grid has at least one item card
    cy.get('[data-testid="menu-item"], .menu-item, .food-item, .item-card').should('have.length.at.least', 1)
    
    // Alternative selector in case the above doesn't match
    cy.get('div').contains(/burger|pizza|chicken|food/i).should('exist')
  })

  it('should show cart badge with 0 items initially', () => {
    cy.visit('/')
    
    // Check for cart badge showing 0
    // This could be in various formats: cart icon with badge, shopping cart, etc.
    cy.get('[data-testid="cart-badge"], .cart-badge, .badge').should('contain', '0')
      .or('not.exist') // Badge might not show when cart is empty
  })

  it('should have working navigation', () => {
    cy.visit('/')
    
    // Test navigation links
    cy.get('nav, .navbar, header').should('be.visible')
    cy.get('a').contains(/menu/i).should('be.visible')
    cy.get('a').contains(/login/i).should('be.visible')
  })
})
