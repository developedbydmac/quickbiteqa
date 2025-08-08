import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { apiService } from '../services/api';
import { cartUtils } from '../utils/cart';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  // Get unique categories from menu items
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  useEffect(() => {
    fetchMenu();
    
    // Update cart count
    const updateCartCount = () => {
      setCartCount(cartUtils.getCartItemCount());
    };
    
    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMenu();
      setMenuItems(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to load menu. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    cartUtils.addToCart(item);
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading menu...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchMenu}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Our Menu
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Fresh ingredients, bold flavors, crafted with care
        </Typography>
      </Box>

      {/* Cart Summary */}
      {cartCount > 0 && (
        <Box sx={{ mb: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="h6">
            Cart: {cartCount} items
          </Typography>
        </Box>
      )}

      {/* Category Tabs */}
      {categories.length > 1 && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <Tab 
                key={category} 
                label={category.charAt(0).toUpperCase() + category.slice(1)} 
                value={category}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <Typography variant="h6" textAlign="center" color="text.secondary">
          No items found in this category.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {item.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="h3">
                      {item.name}
                    </Typography>
                    <Chip 
                      label={`$${item.price}`} 
                      color="primary" 
                      size="small"
                    />
                  </Box>
                  
                  {item.category && (
                    <Chip 
                      label={item.category} 
                      size="small" 
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  )}
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  
                  {item.ingredients && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2, display: 'block' }}>
                      Ingredients: {item.ingredients}
                    </Typography>
                  )}
                  
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => addToCart(item)}
                    sx={{
                      backgroundColor: '#FF9800',
                      '&:hover': {
                        backgroundColor: '#F57C00',
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Footer note */}
      <Box sx={{ textAlign: 'center', mt: 6, py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Can't find what you're looking for? Contact us for custom orders!
        </Typography>
      </Box>
    </Container>
  );
};

export default MenuPage;
