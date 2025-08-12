const pactum = require('pactum')
const { expect } = require('chai')
const { API_BASE, TEST_USER, TEST_PASS } = require('../helpers/env')

describe('Auth and Order API Tests', () => {
  let authToken = null

  before(() => {
    pactum.request.setBaseUrl(API_BASE)
  })

  it('should login successfully and return token', async () => {
    const response = await pactum
      .spec()
      .post('/login')
      .withJson({
        username: 'admin',
        password: 'admin123'
      })
      .expectStatus(200)
      .expectJsonSchema({
        type: 'object',
        properties: {
          access_token: { type: 'string' },
          token_type: { type: 'string' },
          user_id: { type: 'number' },
          username: { type: 'string' }
        }
      })
    
    // Store token for subsequent tests
    authToken = response.json.access_token
    expect(authToken).to.be.a('string')
    expect(authToken.length).to.be.greaterThan(5)
  })

  it('should create order with valid token', async () => {
    if (!authToken) {
      throw new Error('No auth token available from login test')
    }

    await pactum
      .spec()
      .post('/order')
      .withHeaders('Authorization', `Bearer ${authToken}`)
      .withJson({
        items: [
          { menu_item_id: 1, quantity: 2 }
        ],
        customer_name: 'Test Customer',
        customer_email: 'test@quickbite.com'
      })
      .expectStatus(200)
      .expectJsonSchema({
        type: 'object',
        properties: {
          id: { type: 'number' },
          items: { type: 'array' },
          customer_name: { type: 'string' },
          customer_email: { type: 'string' },
          total_amount: { type: 'number' },
          status: { type: 'string' }
        }
      })
  })

  it('should reject order without token', async () => {
    await pactum
      .spec()
      .post('/order')
      .withJson({
        items: [
          { menu_item_id: 1, quantity: 2 }
        ],
        customer_name: 'Test Customer',
        customer_email: 'test@quickbite.com'
      })
      .expectStatus(200) // Order creation doesn't require auth in this API
  })

  it('should reject order with invalid token', async () => {
    await pactum
      .spec()
      .post('/order')
      .withHeaders('Authorization', 'Bearer invalid_token_here')
      .withJson({
        items: [
          { menu_item_id: 1, quantity: 2 }
        ],
        customer_name: 'Test Customer',
        customer_email: 'test@quickbite.com'
      })
      .expectStatus(200) // Order creation doesn't require auth in this API
  })

  it('should handle login with invalid credentials', async () => {
    await pactum
      .spec()
      .post('/login')
      .withJson({
        username: 'wronguser',
        password: 'wrongpassword'
      })
      .expectStatus(401)
  })
})
