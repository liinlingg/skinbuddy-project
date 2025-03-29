export default {
  deleteProductFromCart: async (productId) => {
    const userId = appsmith.store.user.id;
    
    if (!userId) {
      showAlert("No user found! Please log in again.", "error");
      return;
    }

    if (!productId) {
      showAlert("No product selected!", "error");
      return;
    }

    // Confirm before deleting
    const confirmDelete = await showModal("confirmation");
    if (!confirmDelete) {
      return;
    }

    // Run the query to remove the product from the cart
    await delete_cart.run({ userId, productId });

    showAlert("Product removed from cart successfully.", "success");

    // Refresh cart data
    getCart.run();
  }
}
