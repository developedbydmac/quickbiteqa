import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
          background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
          borderRadius: 2,
          color: 'white',
          mb: 6
        }}
      >
        <RestaurantIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to QuickBite
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
          Fast, Fresh, and Delicious Food Delivery
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/menu')}
          sx={{
            backgroundColor: '#FF9800',
            '&:hover': {
              backgroundColor: '#F57C00',
            },
            px: 4,
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          Browse Menu
        </Button>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 4 }}>
        Why Choose QuickBite?
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <MenuBookIcon sx={{ fontSize: 48, color: '#2196F3', mb: 2 }} />
              <Typography variant="h6" component="h3" gutterBottom>
                Diverse Menu
              </Typography>
              <Typography variant="body2" color="text.secondary">
                From appetizers to desserts, we have something for everyone. 
                Fresh ingredients, authentic flavors.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <ShoppingCartIcon sx={{ fontSize: 48, color: '#4CAF50', mb: 2 }} />
              <Typography variant="h6" component="h3" gutterBottom>
                Easy Ordering
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Simple, intuitive ordering process. Add items to cart, 
                customize your order, and checkout in minutes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <RestaurantIcon sx={{ fontSize: 48, color: '#FF9800', mb: 2 }} />
              <Typography variant="h6" component="h3" gutterBottom>
                Quality Service
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fast delivery, excellent customer service, and consistent 
                quality that keeps you coming back.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* CTA Section */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Ready to Order?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Browse our menu and start building your perfect meal
        </Typography>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/menu')}
          sx={{ mr: 2 }}
        >
          View Menu
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/login')}
          sx={{
            backgroundColor: '#4CAF50',
            '&:hover': {
              backgroundColor: '#388E3C',
            }
          }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
