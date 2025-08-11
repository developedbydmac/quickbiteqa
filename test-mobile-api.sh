#!/bin/bash

echo "🧪 Testing QuickBite API Endpoints"
echo "=================================="
echo ""

API_URL="https://vhhkqwkf0l.execute-api.us-east-1.amazonaws.com/dev"

echo "1️⃣ Testing Health Check..."
curl -s "$API_URL/health" | python3 -m json.tool
echo ""

echo "2️⃣ Testing Menu Endpoint..."
curl -s "$API_URL/menu" | python3 -m json.tool | head -20
echo ""

echo "3️⃣ Testing Login Endpoint..."
curl -s -X POST "$API_URL/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | python3 -m json.tool
echo ""

echo "4️⃣ Testing CORS Headers..."
curl -s -I -X OPTIONS "$API_URL/login" \
  -H "Origin: http://quickbite-blue.s3-website-us-east-1.amazonaws.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
echo ""

echo "✅ API Test Complete!"
echo ""
echo "🌐 Frontend URLs (should now work on mobile):"
echo "   🔵 Blue: http://quickbite-blue.s3-website-us-east-1.amazonaws.com"
echo "   🟢 Green: http://quickbite-green.s3-website-us-east-1.amazonaws.com"
echo ""
echo "🔧 Backend API: $API_URL"
echo "📚 API Docs: $API_URL/docs"
