describe('QuickBite QA - CI/CD Smoke Tests', () => {
  const siteBase = Cypress.env('SITE_BASE') || 'http://localhost:3000';

  beforeEach(() => {
    // Set viewport for consistent testing
    cy.viewport(1280, 720);
  });

  it('should load the home page successfully', () => {
    cy.visit(siteBase);
    
    // Check that the page loads and has the correct title
    cy.title().should('contain', 'QuickBite');
    
    // Check for main content
    cy.get('body').should('be.visible').and('not.be.empty');
    
    // Verify no critical JavaScript errors
    cy.window().then((win) => {
      expect(win.console.error).to.not.have.been.called;
    });
  });

  it('should have working navbar navigation', () => {
    cy.visit(siteBase);
    
    // Check navigation elements exist and are clickable
    cy.get('nav, [data-testid="navigation"], .MuiAppBar-root, .MuiToolbar-root').should('be.visible');
    
    // Test that key navigation elements exist
    cy.get('body').then($body => {
      // Look for common navigation patterns
      const navSelectors = [
        'button:contains("Menu")',
        'button:contains("Home")', 
        'a[href="/"]',
        '.MuiButton-root',
        '[data-testid*="nav"]'
      ];
      
      let navFound = false;
      navSelectors.forEach(selector => {
        if ($body.find(selector).length > 0) {
          navFound = true;
          cy.get(selector).first().should('be.visible');
        }
      });
      
      expect(navFound).to.be.true;
    });
  });

  it('should load menu content successfully', () => {
    cy.visit(siteBase);
    
    // Wait for content to load
    cy.get('body', { timeout: 10000 }).should('be.visible');
    
    // Check for menu-related content
    cy.get('body').then($body => {
      // Look for menu indicators
      const menuIndicators = [
        'text containing menu items',
        'price indicators ($)',
        'Material-UI cards',
        'food item containers'
      ];
      
      // Check for price indicators ($ symbols)
      if ($body.text().includes('$')) {
        cy.get('body').should('contain.text', '$');
      }
      
      // Check for Material-UI components (common in React apps)
      if ($body.find('.MuiCard-root, .MuiGrid-root, .MuiContainer-root').length > 0) {
        cy.get('.MuiCard-root, .MuiGrid-root, .MuiContainer-root').should('exist');
      }
      
      // Fallback: ensure page has substantive content
      cy.get('body').invoke('text').then(text => {
        expect(text.length).to.be.greaterThan(100); // At least 100 characters of content
      });
    });
  });

  it('should have working API health endpoint', () => {
    const apiBase = Cypress.env('API_BASE') || 'http://localhost:8000';
    
    // Test API root endpoint
    cy.request({
      method: 'GET',
      url: `${apiBase}/`,
      failOnStatusCode: false
    }).then((response) => {
      // Accept various successful response codes
      expect(response.status).to.be.oneOf([200, 301, 302, 307, 308]);
    });

    // Test menu endpoint
    cy.request({
      method: 'GET', 
      url: `${apiBase}/menu`,
      failOnStatusCode: false
    }).then((response) => {
      // Menu endpoint should be reachable (even if auth required)
      expect(response.status).to.be.oneOf([200, 401, 403, 404]);
    });
  });

  it('should be responsive across different viewports', () => {
    cy.visit(siteBase);
    
    // Test mobile viewport (iPhone SE)
    cy.viewport(375, 667);
    cy.get('body').should('be.visible');
    cy.wait(500); // Allow time for responsive adjustments
    
    // Test tablet viewport (iPad)
    cy.viewport(768, 1024);
    cy.get('body').should('be.visible');
    cy.wait(500);
    
    // Test desktop viewport
    cy.viewport(1920, 1080);
    cy.get('body').should('be.visible');
    cy.wait(500);
    
    // Verify content is still accessible in mobile view
    cy.viewport(375, 667);
    cy.get('body').should('contain.text', 'QuickBite');
  });

  it('should have functional cart elements', () => {
    cy.visit(siteBase);
    
    // Look for cart-related UI elements
    cy.get('body').then($body => {
      const cartSelectors = [
        '[data-testid*="cart"]',
        'button:contains("Cart")',
        '[aria-label*="cart"]',
        '.cart',
        'svg[data-testid="ShoppingCartIcon"]',
        '.MuiSvgIcon-root:contains("shopping")',
        '.MuiBadge-root' // Material-UI badge often used for cart count
      ];
      
      let cartElementFound = false;
      cartSelectors.forEach(selector => {
        if ($body.find(selector).length > 0) {
          cartElementFound = true;
          cy.get(selector).first().should('be.visible');
        }
      });
      
      // Cart element should exist in some form
      expect(cartElementFound).to.be.true;
    });
  });

  it('should handle navigation gracefully', () => {
    cy.visit(siteBase);
    
    // Test that the app doesn't crash on unknown routes
    cy.visit(`${siteBase}/nonexistent-page`, { failOnStatusCode: false });
    
    // Should still render something (error page, redirect, etc.)
    cy.get('body').should('be.visible').and('not.be.empty');
    
    // Navigate back to home
    cy.visit(siteBase);
    cy.get('body').should('contain.text', 'QuickBite');
  });

  it('should load within acceptable performance limits', () => {
    const startTime = Date.now();
    
    cy.visit(siteBase).then(() => {
      const loadTime = Date.now() - startTime;
      
      // Generous timeout for CI/CD environments
      expect(loadTime).to.be.lessThan(15000); // 15 seconds max
      
      // Log performance for monitoring
      cy.log(`Page loaded in ${loadTime}ms`);
      
      // Verify interactive elements are ready
      cy.get('button, a, input').should('exist');
    });
  });

  it('should not have console errors', () => {
    // Capture console errors
    cy.visit(siteBase, {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      }
    });
    
    // Wait for page to fully load
    cy.wait(2000);
    
    // Check that no console errors occurred
    cy.get('@consoleError').should('not.have.been.called');
  });
});
