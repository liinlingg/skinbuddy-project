export default {
  getProductData: () => {
    let productId = get_productid.data?.[0]?._id || null; 

    return {
      user_id: { "$oid": appsmith.store.user.id },
      items: [
        {
          product_id: productId ? { "$oid": productId } : null,  
          quantity: 1
        }
      ]
    };
  }
};
