import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/');
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <RestaurantIcon sx={{ mr: 2 }} />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, fontWeight: 600 }}
          onClick={() => handleNavigation('/home')}
          style={{ cursor: 'pointer' }}
        >
          QuickBite
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            color="inherit" 
            onClick={() => handleNavigation('/home')}
            sx={{ 
              fontWeight: isActive('/home') || isActive('/') ? 600 : 400,
              backgroundColor: isActive('/home') || isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            onClick={() => handleNavigation('/menu')}
            sx={{ 
              fontWeight: isActive('/menu') ? 600 : 400,
              backgroundColor: isActive('/menu') ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            Menu
          </Button>
          <Button 
            color="inherit" 
            onClick={() => handleNavigation('/login')}
            sx={{ 
              fontWeight: isActive('/login') ? 600 : 400,
              backgroundColor: isActive('/login') ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            Login
          </Button>
          <Button 
            color="inherit" 
            onClick={() => handleNavigation('/order')}
            sx={{ 
              fontWeight: isActive('/order') ? 600 : 400,
              backgroundColor: isActive('/order') ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            Order
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
