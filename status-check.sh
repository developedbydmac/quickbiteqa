#!/bin/bash

echo "🎯 QuickBite QA Project - Current Status"
echo "========================================"
echo ""

# Project version info
echo "📋 Version Information:"
echo "   📅 Current Date: $(date)"
echo "   🏷️  Latest Tag: $(git describe --tags --abbrev=0)"
echo "   🌿 Current Branch: $(git branch --show-current)"
echo "   📝 Last Commit: $(git log -1 --pretty=format:'%h - %s')"
echo ""

# Day progress
echo "🚧 Development Progress:"
echo "   ✅ Day 1: Infrastructure + Backend (v1.0-day1)"
echo "   ✅ Day 2: Frontend Development (v2.0-day2)"
echo "   🔒 Day 3: Testing Implementation (Coming Next)"
echo "   🔒 Day 4: CI/CD Pipelines"
echo "   🔒 Day 5: Wrap-up & Documentation"
echo ""

# Current running status
echo "🚀 Application Status:"
echo "   📱 Frontend: http://localhost:3000"
echo "   🔧 Backend: http://127.0.0.1:8000"
echo "   📚 API Docs: http://127.0.0.1:8000/docs"
echo ""

# Quick health check
echo "🏥 Health Check:"
if curl -s http://127.0.0.1:8000/health > /dev/null 2>&1; then
    echo "   ✅ Backend API is running"
else
    echo "   ❌ Backend API is not running"
    echo "      Start with: cd fastapi-app && python3 -m uvicorn main:app --reload"
fi

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ Frontend is running"
else
    echo "   ❌ Frontend is not running"
    echo "      Start with: cd frontend && npm start"
fi

echo ""
echo "📂 Project Structure:"
echo "   📁 terraform/     - AWS Infrastructure (S3, IAM)"
echo "   📁 fastapi-app/   - Python FastAPI Backend"
echo "   📁 frontend/      - React Frontend Application"
echo "   📁 docs/          - Documentation & Screenshots"
echo ""

echo "🎉 Day 2 Complete - Ready for Day 3 Testing Phase!"
echo "   🎯 Next: Cypress E2E + Pactum Contract Testing"
echo "   📝 See: DAY2-COMPLETION-SUMMARY.md for full details"
