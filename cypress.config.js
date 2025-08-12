const { defineConfig } = require('cypress')
require('dotenv').config({ path: './tests/.env' })

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.SITE_BASE || 'http://127.0.0.1:5173',
    viewportWidth: 1280,
    viewportHeight: 800,
    screenshotOnRunFailure: true,
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      TEST_USER: process.env.TEST_USER || 'email@example.com',
      TEST_PASS: process.env.TEST_PASS || 'Password123'
    }
  },
})
