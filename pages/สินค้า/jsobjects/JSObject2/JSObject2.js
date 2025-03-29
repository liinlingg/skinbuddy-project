export default {
  getProductData: () => {
    // Get the product ID safely
    let productId = get_productid.data?.[0]?._id || null;
    
    // Safely check if the product is in the cart
    const isProductInCart = cart_collection.data && 
      cart_collection.data.some(cartItem => 
        cartItem.items && 
        cartItem.items.some(item => 
          item.product_id && 
          (item.product_id.$oid === productId || 
           item.product_id === productId)
        )
      );
    
    // Log for debugging
    console.log("Product ID:", productId);
    console.log("Is Product in Cart:", isProductInCart);
    
    // Return only the product ID
    return productId;
  }
};