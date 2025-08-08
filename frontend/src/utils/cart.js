// Cart management utilities
export const cartUtils = {
  getCart: () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  },

  saveCart: (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch custom event to notify components of cart updates
    window.dispatchEvent(new Event('cartUpdated'));
  },

  addToCart: (item) => {
    const cart = cartUtils.getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    cartUtils.saveCart(cart);
    return cart;
  },

  removeFromCart: (itemId) => {
    const cart = cartUtils.getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    cartUtils.saveCart(updatedCart);
    return updatedCart;
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      return cartUtils.removeFromCart(itemId);
    }
    
    const cart = cartUtils.getCart();
    const updatedCart = cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity }
        : item
    );
    
    cartUtils.saveCart(updatedCart);
    return updatedCart;
  },

  getCartTotal: () => {
    const cart = cartUtils.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartItemCount: () => {
    const cart = cartUtils.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

export default cartUtils;
