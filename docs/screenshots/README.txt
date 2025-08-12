# Screenshots Directory

This directory contains test execution screenshots as proof of successful test runs.

## Expected Screenshots

After running the test suite successfully, the following screenshots should be captured:

### Day 3 Test Suite Screenshots

1. **day3_cypress_pass.png** - Cypress UI test suite passing
   - Shows all Cypress e2e tests completed successfully
   - Includes smoke tests and order flow tests
   - Should show green checkmarks for all test cases

2. **day3_pactum_pass.png** - Pactum API test suite passing  
   - Shows all API tests completed successfully
   - Includes menu API tests and auth/order tests
   - Should show test count and pass/fail status

## Capturing Screenshots

To capture and save screenshots after a successful test run:

1. Run the full test suite:
   ```bash
   npm run test
   ```

2. If tests pass, manually capture screenshots:
   - For Cypress: Take screenshot of test runner results
   - For Pactum: Take screenshot of terminal output

3. Save screenshots to this directory with the naming convention above

4. Copy latest Cypress auto-generated screenshots:
   ```bash
   make screenshots
   ```

## Automated Screenshot Capture

Screenshots are automatically captured by Cypress on test failures and stored in:
- `cypress/screenshots/` - Automatic failure screenshots
- `cypress/videos/` - Test execution videos

Use the Makefile target to copy relevant screenshots to documentation:
```bash
make screenshots
```

## Usage in Documentation

These screenshots serve as:
- Proof of test execution
- Documentation of test coverage
- Evidence of successful Day 3 completion
- Reference for CI/CD pipeline validation

## Notes

- Screenshots should be updated after significant changes to test suite
- Include both local and remote (S3) test execution screenshots
- Ensure screenshots show clear pass/fail status and test names
- File sizes should be reasonable for version control (< 500KB each)
