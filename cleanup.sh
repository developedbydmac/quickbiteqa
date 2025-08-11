#!/bin/bash

echo "🧹 QuickBite QA - Project Cleanup Script"
echo "========================================"
echo ""

# Remove Lambda deployment packages
echo "1️⃣ Cleaning Lambda deployment files..."
rm -rf fastapi-app/lambda-package/
rm -f terraform/*.zip
echo "   ✅ Lambda packages removed"

# Remove build artifacts
echo "2️⃣ Cleaning build artifacts..."
rm -rf frontend/build/
echo "   ✅ Frontend build directory removed"

# Clean Python cache
echo "3️⃣ Cleaning Python cache..."
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find . -name "*.pyc" -delete 2>/dev/null || true
echo "   ✅ Python cache cleaned"

# Clean Node modules (optional - uncomment if needed)
# echo "4️⃣ Cleaning Node modules..."
# rm -rf frontend/node_modules/
# echo "   ✅ Node modules removed"

echo ""
echo "🎉 Cleanup complete! Repository is ready for commit."
echo ""
echo "💡 To rebuild:"
echo "   Frontend: cd frontend && npm install && npm run build"
echo "   Backend:  cd fastapi-app && pip install -r requirements.txt"
echo ""
echo "🚀 To redeploy:"
echo "   ./deploy-backend-aws.sh"
