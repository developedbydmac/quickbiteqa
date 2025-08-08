import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  Divider,
  TextField,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import apiService from '../api/apiService';

const Order = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrderFromStorage();
  }, []);

  const loadOrderFromStorage = () => {
    try {
      const savedOrder = JSON.parse(localStorage.getItem('order') || '[]');
      setOrderItems(savedOrder);
    } catch (error) {
      console.error('Error loading order from localStorage:', error);
      setError('Failed to load your order. Please try again.');
    }
  };

  const handleRemoveItem = (id) => {
    try {
      const updatedItems = orderItems.filter(item => item.id !== id);
      setOrderItems(updatedItems);
      localStorage.setItem('order', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item. Please try again.');
    }
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    // Validate form
    if (orderItems.length === 0) {
      setError('Your order is empty!');
      return;
    }
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      setError('Please fill in all customer information!');
      return;
    }

    // Prepare order data
    const orderData = {
      customer_info: customerInfo,
      items: orderItems,
      total: parseFloat(calculateTotal())
    };

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await apiService.placeOrder(orderData);
      
      // Clear order and form on success
      setOrderItems([]);
      setCustomerInfo({ name: '', email: '', phone: '', address: '' });
      localStorage.removeItem('order');
      
      setSuccess(`Order placed successfully! Order ID: ${response.order_id || 'N/A'}`);
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Your Order
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Order Items */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShoppingCartIcon sx={{ mr: 1 }} />
              <Typography variant="h5">Order Items</Typography>
            </Box>
            
            {orderItems.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                Your order is empty. Go to the menu to add items!
              </Typography>
            ) : (
              <List>
                {orderItems.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={item.name}
                      secondary={`Quantity: ${item.quantity} × $${item.price} = $${(item.price * item.quantity).toFixed(2)}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
            
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" textAlign="right">
              Total: ${calculateTotal()}
            </Typography>
          </Paper>
        </Grid>

        {/* Customer Information */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Customer Information
            </Typography>
            
            <TextField
              fullWidth
              label="Full Name"
              value={customerInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={customerInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Delivery Address"
              multiline
              rows={3}
              value={customerInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              margin="normal"
              required
            />
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handlePlaceOrder}
              sx={{ mt: 3, py: 1.5 }}
              disabled={orderItems.length === 0 || loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Placing Order...' : `Place Order - $${calculateTotal()}`}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Order;
