const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const API_BASE = process.env.API_BASE || 'http://127.0.0.1:8000'
const TEST_USER = process.env.TEST_USER || 'email@example.com'
const TEST_PASS = process.env.TEST_PASS || 'Password123'
const SITE_BASE = process.env.SITE_BASE || 'http://127.0.0.1:5173'

module.exports = {
  API_BASE,
  TEST_USER,
  TEST_PASS,
  SITE_BASE
}
