from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from datetime import datetime

app = FastAPI(
    title="QuickBite QA API",
    description="A FastAPI application for QuickBite restaurant with menu, ordering, and authentication",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Pydantic models
class MenuItem(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    available: bool = True

class OrderItem(BaseModel):
    menu_item_id: int
    quantity: int

class Order(BaseModel):
    id: Optional[int] = None
    items: List[OrderItem]
    customer_name: str
    customer_email: str
    total_amount: Optional[float] = None
    status: str = "pending"
    created_at: Optional[datetime] = None

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    username: str

# Dummy data
DUMMY_MENU = [
    MenuItem(id=1, name="Classic Burger", description="Beef patty with lettuce, tomato, and cheese", price=12.99, category="burgers"),
    MenuItem(id=2, name="Chicken Caesar Salad", description="Fresh romaine with grilled chicken and caesar dressing", price=10.99, category="salads"),
    MenuItem(id=3, name="Margherita Pizza", description="Fresh mozzarella, tomato sauce, and basil", price=14.99, category="pizza"),
    MenuItem(id=4, name="Fish Tacos", description="Grilled fish with cabbage slaw and chipotle mayo", price=13.99, category="tacos"),
    MenuItem(id=5, name="Chocolate Brownie", description="Rich chocolate brownie with vanilla ice cream", price=6.99, category="desserts"),
    MenuItem(id=6, name="French Fries", description="Crispy golden fries with sea salt", price=4.99, category="sides"),
    MenuItem(id=7, name="Craft Beer", description="Local IPA on tap", price=5.99, category="beverages"),
    MenuItem(id=8, name="Iced Coffee", description="Cold brew coffee with milk", price=3.99, category="beverages"),
]

DUMMY_USERS = {
    "admin": {"password": "admin123", "user_id": 1},
    "customer": {"password": "customer123", "user_id": 2},
    "staff": {"password": "staff123", "user_id": 3}
}

DUMMY_ORDERS = []
order_counter = 1

# Authentication helper
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verify the JWT token (simplified for demo)
    In production, implement proper JWT verification
    """
    token = credentials.credentials
    if token == "valid_token":
        return {"user_id": 1, "username": "demo_user"}
    raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to QuickBite QA API",
        "version": "1.0.0",
        "endpoints": {
            "menu": "/menu",
            "orders": "/order",
            "login": "/login"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now()}

@app.get("/menu", response_model=List[MenuItem])
async def get_menu(category: Optional[str] = None):
    """
    Get menu items, optionally filtered by category
    
    Args:
        category: Optional category filter (burgers, salads, pizza, tacos, desserts, sides, beverages)
    """
    if category:
        filtered_menu = [item for item in DUMMY_MENU if item.category.lower() == category.lower()]
        if not filtered_menu:
            raise HTTPException(status_code=404, detail=f"No items found in category: {category}")
        return filtered_menu
    return DUMMY_MENU

@app.get("/menu/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: int):
    """Get a specific menu item by ID"""
    menu_item = next((item for item in DUMMY_MENU if item.id == item_id), None)
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return menu_item

@app.post("/order", response_model=Order)
async def create_order(order: Order):
    """
    Create a new order
    
    Args:
        order: Order details including items, customer info
    """
    global order_counter
    
    # Validate menu items exist
    menu_item_ids = {item.id for item in DUMMY_MENU}
    for order_item in order.items:
        if order_item.menu_item_id not in menu_item_ids:
            raise HTTPException(
                status_code=400, 
                detail=f"Menu item with ID {order_item.menu_item_id} not found"
            )
    
    # Calculate total amount
    total = 0
    for order_item in order.items:
        menu_item = next(item for item in DUMMY_MENU if item.id == order_item.menu_item_id)
        total += menu_item.price * order_item.quantity
    
    # Create order
    new_order = Order(
        id=order_counter,
        items=order.items,
        customer_name=order.customer_name,
        customer_email=order.customer_email,
        total_amount=round(total, 2),
        status="pending",
        created_at=datetime.now()
    )
    
    DUMMY_ORDERS.append(new_order)
    order_counter += 1
    
    return new_order

@app.get("/order", response_model=List[Order])
async def get_orders(user_data: dict = Depends(verify_token)):
    """
    Get all orders (requires authentication)
    """
    return DUMMY_ORDERS

@app.get("/order/{order_id}", response_model=Order)
async def get_order(order_id: int):
    """Get a specific order by ID"""
    order = next((order for order in DUMMY_ORDERS if order.id == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@app.put("/order/{order_id}/status")
async def update_order_status(
    order_id: int, 
    status: str,
    user_data: dict = Depends(verify_token)
):
    """
    Update order status (requires authentication)
    
    Args:
        order_id: Order ID
        status: New status (pending, preparing, ready, delivered, cancelled)
    """
    valid_statuses = ["pending", "preparing", "ready", "delivered", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    order = next((order for order in DUMMY_ORDERS if order.id == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.status = status
    return {"message": f"Order {order_id} status updated to {status}"}

@app.post("/login", response_model=LoginResponse)
async def login(login_request: LoginRequest):
    """
    User login endpoint
    
    Args:
        login_request: Username and password
        
    Returns:
        Access token and user information
    """
    username = login_request.username
    password = login_request.password
    
    if username not in DUMMY_USERS:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    user = DUMMY_USERS[username]
    if user["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # In production, generate a proper JWT token
    access_token = "valid_token"
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=user["user_id"],
        username=username
    )

@app.get("/categories")
async def get_categories():
    """Get all available menu categories"""
    categories = list(set(item.category for item in DUMMY_MENU))
    return {"categories": sorted(categories)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
