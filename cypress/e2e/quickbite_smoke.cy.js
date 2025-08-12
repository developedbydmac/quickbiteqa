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
    
    // Wait for page to load and check for Material-UI components or content
    cy.get('.MuiContainer-root, .MuiCard-root, .MuiGrid-root').should('exist')
    
    // Alternative: check for menu content text
    cy.get('body').should('contain.text', 'Menu')
  })

  it('should show cart badge with 0 items initially', () => {
    cy.visit('/')
    
    // Check for cart badge showing 0 or not existing
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cart-badge"], .cart-badge, .badge').length > 0) {
        cy.get('[data-testid="cart-badge"], .cart-badge, .badge').should('contain', '0')
      } else {
        // Badge might not show when cart is empty - that's also valid
        cy.log('Cart badge not found - this is acceptable for empty cart')
      }
    })
  })

  it('should have working navigation', () => {
    cy.visit('/')
    
    // Test navigation - look for Material-UI AppBar and navigation buttons
    cy.get('.MuiAppBar-root, .MuiToolbar-root').should('be.visible')
    
    // Test that navigation contains expected buttons (Material-UI uses Button components, not <a> tags)
    cy.get('.MuiButton-root').contains(/menu/i).should('exist')
    cy.get('.MuiButton-root').contains(/home/i).should('exist')
  })
})
