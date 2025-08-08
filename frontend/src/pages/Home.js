import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

const Home = () => {
  const navigate = useNavigate();

  const handleGoToMenu = () => {
    navigate('/menu');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          py: 8,
          background: 'linear-gradient(135deg, #2196F3 0%, #4CAF50 100%)',
          borderRadius: 2,
          color: 'white',
        }}
      >
        <RestaurantIcon sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to QuickBite
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
          Fast, Fresh, and Delicious Food Delivered to Your Door
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleGoToMenu}
          sx={{ 
            backgroundColor: '#FF9800',
            '&:hover': {
              backgroundColor: '#F57C00',
            },
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
          }}
        >
          View Our Menu
        </Button>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 4 }}>
        Why Choose QuickBite?
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <DeliveryDiningIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Fast Delivery
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Get your favorite meals delivered in 30 minutes or less
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <StarIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Quality Food
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Fresh ingredients and chef-prepared meals for the best taste
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 60, color: '#FF9800', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              24/7 Service
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Order anytime, anywhere. We're here when you're hungry
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 4,
          backgroundColor: 'grey.50',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Ready to Order?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Browse our delicious menu and place your order now
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={handleGoToMenu}
          sx={{ px: 4, py: 1.5 }}
        >
          Explore Menu
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
