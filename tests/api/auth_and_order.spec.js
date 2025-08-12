const pactum = require('pactum')
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
        email: TEST_USER,
        password: TEST_PASS
      })
      .expectStatus(200)
      .expectJsonSchema({
        type: 'object',
        properties: {
          token: { type: 'string' },
          access_token: { type: 'string' }
        }
      })
    
    // Store token for subsequent tests
    authToken = response.json.token || response.json.access_token
    expect(authToken).to.be.a('string')
    expect(authToken.length).to.be.greaterThan(10)
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
          { id: 1, qty: 2 }
        ]
      })
      .expectStatus(200)
      .expectJsonSchema({
        type: 'object',
        properties: {
          orderId: { type: ['string', 'number'] },
          id: { type: ['string', 'number'] }
        }
      })
  })

  it('should reject order without token', async () => {
    await pactum
      .spec()
      .post('/order')
      .withJson({
        items: [
          { id: 1, qty: 2 }
        ]
      })
      .expectStatus(401)
  })

  it('should reject order with invalid token', async () => {
    await pactum
      .spec()
      .post('/order')
      .withHeaders('Authorization', 'Bearer invalid_token_here')
      .withJson({
        items: [
          { id: 1, qty: 2 }
        ]
      })
      .expectStatus(401)
  })

  it('should handle login with invalid credentials', async () => {
    await pactum
      .spec()
      .post('/login')
      .withJson({
        email: 'wrong@email.com',
        password: 'wrongpassword'
      })
      .expectStatus(401)
  })
})
