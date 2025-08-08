import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import apiService from '../api/apiService';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const data = await apiService.fetchMenu();
      setMenuItems(data);
      setError('');
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to load menu items. Please try again.');
      // Fallback to dummy data for development
      setMenuItems([
        {
          id: 1,
          name: 'Classic Burger',
          description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
          price: 12.99,
          category: 'Burgers',
          image: 'https://via.placeholder.com/300x200?text=Classic+Burger'
        },
        {
          id: 2,
          name: 'Margherita Pizza',
          description: 'Fresh mozzarella, tomato sauce, and basil on crispy crust',
          price: 14.99,
          category: 'Pizza',
          image: 'https://via.placeholder.com/300x200?text=Margherita+Pizza'
        },
        {
          id: 3,
          name: 'Caesar Salad',
          description: 'Crisp romaine lettuce with parmesan cheese and croutons',
          price: 9.99,
          category: 'Salads',
          image: 'https://via.placeholder.com/300x200?text=Caesar+Salad'
        },
        {
          id: 4,
          name: 'Chicken Wings',
          description: 'Crispy wings with your choice of sauce',
          price: 11.99,
          category: 'Appetizers',
          image: 'https://via.placeholder.com/300x200?text=Chicken+Wings'
        },
        {
          id: 5,
          name: 'Fish Tacos',
          description: 'Grilled fish with fresh salsa and avocado',
          price: 13.99,
          category: 'Tacos',
          image: 'https://via.placeholder.com/300x200?text=Fish+Tacos'
        },
        {
          id: 6,
          name: 'Pasta Carbonara',
          description: 'Creamy pasta with bacon and parmesan cheese',
          price: 15.99,
          category: 'Pasta',
          image: 'https://via.placeholder.com/300x200?text=Pasta+Carbonara'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToOrder = (item) => {
    try {
      const existingOrder = JSON.parse(localStorage.getItem('order') || '[]');
      const existingItemIndex = existingOrder.findIndex(orderItem => orderItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        existingOrder[existingItemIndex].quantity += 1;
      } else {
        existingOrder.push({ ...item, quantity: 1 });
      }
      
      localStorage.setItem('order', JSON.stringify(existingOrder));
      alert(`${item.name} added to order!`);
    } catch (error) {
      console.error('Error adding item to order:', error);
      alert('Failed to add item to order. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading menu items...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Our Menu
      </Typography>
      
      <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
        Delicious meals made with fresh ingredients
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 1 }}>
                  <Chip 
                    label={item.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {item.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary" fontWeight="600">
                    ${item.price}
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => handleAddToOrder(item)}
                  >
                    Add to Order
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Menu;
