# Testing Guide for QuickBite QA

This document explains how to run UI and API tests for the QuickBite QA application.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **QuickBite backend** running on `http://127.0.0.1:8000`
4. **QuickBite frontend** running on `http://127.0.0.1:5173`

## Installation

Install test dependencies:

```bash
npm install
```

## Environment Configuration

Test configuration is stored in `tests/.env`:

```env
API_BASE=http://127.0.0.1:8000
SITE_BASE=http://127.0.0.1:5173
TEST_USER=email@example.com
TEST_PASS=Password123
```

## Running Tests

### API Tests (Pactum)

Run API tests against the backend:

```bash
npm run test:api
```

This will:
- Test health endpoint
- Test menu API endpoints
- Test authentication and order creation
- Validate API response schemas

### UI Tests (Cypress)

Run UI tests in headless mode:

```bash
npm run test:ui
```

Run UI tests interactively:

```bash
npm run cypress:open
```

### Run All Tests

Run both API and UI tests in sequence:

```bash
npm run test
```

## Remote Testing

To test against the deployed S3 site instead of local development:

1. Update `tests/.env`:
   ```env
   SITE_BASE=http://quickbite-blue.s3-website-us-east-1.amazonaws.com
   ```

2. Run tests:
   ```bash
   npm run test:ui
   ```

## Test Structure

### API Tests (`tests/api/`)
- `menu.spec.js` - Menu endpoint tests
- `auth_and_order.spec.js` - Authentication and order flow tests

### UI Tests (`cypress/e2e/`)
- `quickbite_smoke.cy.js` - Basic smoke tests
- `quickbite_order.cy.js` - Complete order flow tests

### Support Files
- `cypress/support/e2e.js` - Custom commands including `cy.login()`
- `tests/helpers/env.js` - Environment configuration helper

## Test Artifacts

Test results are stored in:
- `cypress/videos/` - Test execution videos
- `cypress/screenshots/` - Screenshots on test failures
- `docs/screenshots/` - Captured success screenshots

## Troubleshooting

### Backend Not Running
If API tests fail:
```bash
cd fastapi-app
python -m uvicorn main:app --reload --port 8000
```

### Frontend Not Running
If UI tests fail:
```bash
cd frontend
npm start
```

### Environment Issues
Verify your `.env` file has correct URLs and credentials.

### Cypress Issues
Clear Cypress cache if needed:
```bash
npx cypress cache clear
npx cypress install
```

## Custom Commands

### cy.login(email, password)
Custom Cypress command for user authentication:

```javascript
cy.login(Cypress.env('TEST_USER'), Cypress.env('TEST_PASS'))
```

This command:
1. Visits the login page
2. Fills email and password fields
3. Submits the form
4. Verifies that a token is stored in localStorage

## CI/CD Integration

Tests are designed to run in CI environments. See `.github/workflows/test-only.yml` for GitHub Actions configuration.

Environment variables in CI:
- `SITE_BASE` - Frontend URL to test against
- `API_BASE` - Backend API URL
- `TEST_USER` - Test user email
- `TEST_PASS` - Test user password
