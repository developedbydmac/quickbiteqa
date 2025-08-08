import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  TextField,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { cartUtils } from '../utils/cart';

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Load cart using cart utilities for consistency
    const savedCart = cartUtils.getCart();
    setCart(savedCart);
    setIsCartLoaded(true); // Mark cart as loaded
    
    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      setCart(cartUtils.getCart());
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    // Only save cart after it has been initially loaded to prevent clearing existing cart
    if (isCartLoaded) {
      cartUtils.saveCart(cart);
    }
  }, [cart, isCartLoaded]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    const updatedCart = cartUtils.updateQuantity(itemId, newQuantity);
    setCart(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartUtils.removeFromCart(itemId);
    setCart(updatedCart);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
    if (error) setError(null);
  };

  const validateForm = () => {
    if (cart.length === 0) {
      setError('Your cart is empty. Please add some items first.');
      return false;
    }
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      setError('Please fill in all required fields (name, email, phone).');
      return false;
    }
    if (!customerInfo.email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        delivery_address: customerInfo.address,
        items: cart.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: parseFloat(getTotal())
      };

      const response = await apiService.createOrder(orderData);
      
      if (response.data) {
        setSuccess(true);
        setOrderId(response.data.id || 'N/A');
        setCart([]); // Clear cart
        localStorage.removeItem('cart'); // Clear saved cart
      }
    } catch (err) {
      console.error('Order submission error:', err);
      if (err.response?.status === 401) {
        setError('Please log in to place an order.');
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Failed to submit order. Please check if you are logged in.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Order submitted successfully!
          </Alert>
          <Typography variant="h5" gutterBottom>
            Thank you for your order!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Order ID: {orderId}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            We'll send updates to {customerInfo.email}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/menu')}
          >
            Order Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ShoppingCartIcon sx={{ fontSize: 48, color: '#2196F3', mb: 1 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Your Order
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {cart.length === 0 ? (
        <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/menu')}
            sx={{ mt: 2 }}
          >
            Browse Menu
          </Button>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Cart Items */}
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Cart Items ({getTotalItems()})
                </Typography>
                <List>
                  {cart.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        secondaryAction={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ minWidth: '20px', textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <AddIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={item.name}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                ${item.price} each
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < cart.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">
                    Total: ${getTotal()}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/menu')}
                  >
                    Add More Items
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Customer Information Form */}
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Box component="form" onSubmit={handleSubmitOrder}>
                  <TextField
                    fullWidth
                    required
                    label="Full Name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    margin="normal"
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    margin="normal"
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    margin="normal"
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    label="Delivery Address"
                    name="address"
                    multiline
                    rows={3}
                    value={customerInfo.address}
                    onChange={handleCustomerInfoChange}
                    margin="normal"
                    disabled={loading}
                    helperText="Optional: Leave blank for pickup"
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading || cart.length === 0}
                    sx={{
                      mt: 3,
                      backgroundColor: '#4CAF50',
                      '&:hover': {
                        backgroundColor: '#388E3C',
                      }
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      `Place Order - $${getTotal()}`
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default OrderPage;
