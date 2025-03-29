export default {
  incrementQuantity: async function(cartItemId, currentQuantity) {
    const newQuantity = currentQuantity + 1;
    await this.updateCartItemQuantity(cartItemId, newQuantity);
  },
  
  decrementQuantity: async function(cartItemId, currentQuantity) {
    if (currentQuantity <= 1) return;
    const newQuantity = currentQuantity - 1;
    await this.updateCartItemQuantity(cartItemId, newQuantity);
  },
  
  updateCartItemQuantity: async function(cartItemId, newQuantity) {
    // Set parameters for your update query
    await inc_cart.run({
      cartItemId: cartItemId,
      newQuantity: newQuantity
    });
    
    // Refresh cart data
    await getCart.run();
    
    // Update cart total (if you have one)
    this.updateCartTotal();
  },
  
  updateCartTotal: function() {
    // Calculate and update cart total
    const total = getCart.data.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    // Update a widget showing the total
    storeValue('cartTotal', total);
  }
}