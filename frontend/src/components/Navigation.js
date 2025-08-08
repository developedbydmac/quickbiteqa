import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  AccountCircle,
  Home,
  MenuBook,
  Logout
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../services/api';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(apiService.isAuthenticated());
    
    // Update cart count from localStorage
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    
    // Listen for cart updates (custom event)
    window.addEventListener('cartUpdated', updateCartCount);
    
    // Listen for auth changes
    window.addEventListener('authChanged', () => {
      setIsAuthenticated(apiService.isAuthenticated());
    });

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('authChanged', () => {
        setIsAuthenticated(apiService.isAuthenticated());
      });
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    apiService.clearAuthToken();
    setIsAuthenticated(false);
    handleMenuClose();
    navigate('/');
    // Dispatch custom event
    window.dispatchEvent(new Event('authChanged'));
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Menu', path: '/menu', icon: <MenuBook /> },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const renderDesktopMenu = () => (
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          onClick={() => navigate(item.path)}
          startIcon={item.icon}
          sx={{
            mx: 1,
            backgroundColor: isActivePath(item.path) ? 'rgba(255,255,255,0.1)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            }
          }}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  const renderMobileMenu = () => (
    <Menu
      anchorEl={mobileMenuAnchor}
      open={Boolean(mobileMenuAnchor)}
      onClose={handleMobileMenuClose}
    >
      {navigationItems.map((item) => (
        <MenuItem
          key={item.path}
          onClick={() => {
            navigate(item.path);
            handleMobileMenuClose();
          }}
          selected={isActivePath(item.path)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {item.icon}
            {item.label}
          </Box>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#2196F3' }}>
      <Toolbar>
        {/* Logo and Brand */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          <RestaurantIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: isMobile ? 1 : 0, 
            cursor: 'pointer',
            mr: 4
          }}
          onClick={() => navigate('/')}
        >
          QuickBite
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {renderDesktopMenu()}
          </Box>
        )}

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Cart Button */}
          <IconButton
            color="inherit"
            onClick={() => navigate('/order')}
            sx={{
              backgroundColor: cartCount > 0 ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Auth Actions */}
          {!isMobile && (
            <>
              {isAuthenticated ? (
                <>
                  <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{
                    border: '1px solid rgba(255,255,255,0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  Sign In
                </Button>
              )}
            </>
          )}
        </Box>

        {/* Mobile Menu */}
        {renderMobileMenu()}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
