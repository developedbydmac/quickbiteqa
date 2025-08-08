#!/bin/bash

echo "🛒 Testing Cart Functionality"
echo "=============================="
echo ""

# Test that backend is running
echo "1. Checking backend status..."
if curl -s http://127.0.0.1:8000/menu > /dev/null; then
    echo "   ✅ Backend API is running"
else
    echo "   ❌ Backend API is not responding"
    exit 1
fi

# Test that frontend is running
echo ""
echo "2. Checking frontend status..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "   ✅ Frontend is running"
else
    echo "   ❌ Frontend is not responding"
    exit 1
fi

echo ""
echo "3. Cart Functionality Test Instructions:"
echo "   📝 Follow these steps to test the cart:"
echo ""
echo "   Step 1: Open http://localhost:3000 in your browser"
echo "   Step 2: Click 'Login' and use one of the test credential buttons"
echo "   Step 3: Navigate to 'Menu' page"
echo "   Step 4: Click 'Add to Cart' on any menu item"
echo "   Step 5: Check that the cart counter in navigation updates"
echo "   Step 6: Click 'Order' to see your cart contents"
echo ""
echo "   🔍 If cart appears empty, check browser developer tools:"
echo "   - Press F12 to open developer tools"
echo "   - Go to 'Application' tab"
echo "   - Under 'Storage' > 'Local Storage' > 'http://localhost:3000'"
echo "   - Look for 'cart' key and its value"
echo ""
echo "4. Available Test Users:"
echo "   👤 Admin: admin/admin123"
echo "   👤 Customer: customer/customer123"
echo "   👤 Staff: staff/staff123"
echo ""
echo "🚀 Cart functionality should now be working with the latest fixes!"
