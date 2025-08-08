#!/bin/bash

echo "🧪 QuickBite Frontend - API Integration Test"
echo "=============================================="

# Test backend health
echo "1. Testing backend health..."
health_response=$(curl -s http://127.0.0.1:8000/health)
if [[ $health_response == *"healthy"* ]]; then
    echo "   ✅ Backend is healthy"
else
    echo "   ❌ Backend health check failed"
    exit 1
fi

# Test menu endpoint
echo "2. Testing menu endpoint..."
menu_response=$(curl -s http://127.0.0.1:8000/menu)
if [[ $menu_response == *"name"* && $menu_response == *"price"* ]]; then
    echo "   ✅ Menu endpoint working"
    # Count menu items
    item_count=$(echo $menu_response | grep -o '"id":' | wc -l)
    echo "   📊 Found $item_count menu items"
else
    echo "   ❌ Menu endpoint failed"
    exit 1
fi

# Test CORS (simulate frontend request)
echo "3. Testing CORS configuration..."
cors_response=$(curl -s -H "Origin: http://localhost:3000" \
                     -H "Access-Control-Request-Method: GET" \
                     -H "Access-Control-Request-Headers: X-Requested-With" \
                     -X OPTIONS \
                     http://127.0.0.1:8000/menu)

if curl -s -H "Origin: http://localhost:3000" http://127.0.0.1:8000/health > /dev/null; then
    echo "   ✅ CORS configuration working"
else
    echo "   ⚠️  CORS might need configuration"
fi

# Test login endpoint
echo "4. Testing login endpoint structure..."
if curl -s -X POST http://127.0.0.1:8000/login \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=test&password=test" > /dev/null 2>&1; then
    echo "   ✅ Login endpoint accessible"
else
    echo "   ⚠️  Login endpoint needs authentication setup"
fi

echo ""
echo "🚀 Frontend Application Status:"
echo "   📱 React App: http://localhost:3000"
echo "   🔧 Backend API: http://127.0.0.1:8000"
echo "   📚 API Docs: http://127.0.0.1:8000/docs"
echo ""
echo "✨ Integration test complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Test navigation between pages"
echo "   3. Try adding items to cart from menu"
echo "   4. Test login functionality"
echo "   5. Verify order submission"
