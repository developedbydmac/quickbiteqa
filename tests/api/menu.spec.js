const pactum = require('pactum')
const { expect } = require('chai')
const { API_BASE } = require('../helpers/env')

describe('Menu API Tests', () => {
  before(() => {
    pactum.request.setBaseUrl(API_BASE)
  })

  it('should return 200 for health check', async () => {
    await pactum
      .spec()
      .get('/health')
      .expectStatus(200)
  })

  it('should return menu items with correct structure', async () => {
    await pactum
      .spec()
      .get('/menu')
      .expectStatus(200)
      .expectJsonSchema({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            price: { type: 'number' }
          },
          required: ['id', 'name', 'price']
        }
      })
      .expectJsonLength('>', 0)
  })

  it('should filter menu items by category', async () => {
    await pactum
      .spec()
      .get('/menu')
      .withQueryParams('category', 'burgers')
      .expectStatus(200)
      .expectJsonSchema({
        type: 'array'
      })
      .stores('burgerItems', '.')
    
    // Verify all returned items have burgers category
    const response = await pactum
      .spec()
      .get('/menu')
      .withQueryParams('category', 'burgers')
      .expectStatus(200)
    
    if (response.json.length > 0) {
      response.json.forEach(item => {
        if (item.category) {
          expect(item.category.toLowerCase()).to.include('burgers')
        }
      })
    }
  })

  it('should handle invalid endpoints gracefully', async () => {
    await pactum
      .spec()
      .get('/nonexistent')
      .expectStatus(404)
  })
})
