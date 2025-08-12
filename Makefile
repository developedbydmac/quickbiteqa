# Makefile for QuickBite QA Testing

.PHONY: test_api test_ui test screenshots help

# Default target
help:
	@echo "Available targets:"
	@echo "  test_api     - Run Pactum API tests"
	@echo "  test_ui      - Run Cypress UI tests"
	@echo "  test         - Run both API and UI tests"
	@echo "  screenshots  - Copy latest Cypress screenshots to docs/screenshots"
	@echo "  clean        - Clean test artifacts"
	@echo "  setup        - Install test dependencies"

# Setup test dependencies
setup:
	npm install
	npx cypress install

# Run API tests
test_api:
	npm run test:api

# Run UI tests
test_ui:
	npm run test:ui

# Run all tests
test: test_api test_ui

# Copy screenshots to documentation
screenshots:
	@echo "Copying Cypress screenshots to docs/screenshots..."
	@mkdir -p docs/screenshots
	@if [ -d "cypress/screenshots" ]; then \
		cp cypress/screenshots/**/*.png docs/screenshots/ 2>/dev/null || true; \
		echo "Screenshots copied to docs/screenshots/"; \
	else \
		echo "No screenshots found. Run tests first."; \
	fi

# Clean test artifacts
clean:
	rm -rf cypress/videos cypress/screenshots
	rm -rf node_modules/.cache

# Development helpers
dev_backend:
	cd fastapi-app && python -m uvicorn main:app --reload --port 8000

dev_frontend:
	cd frontend && npm start

# Install and run
install_and_test: setup test

# Remote testing against S3
test_remote:
	SITE_BASE=http://quickbite-blue.s3-website-us-east-1.amazonaws.com npm run test:ui
