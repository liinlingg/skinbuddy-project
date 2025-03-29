export default {
  updateCartQuantity: async (selectedProductId, newQuantity) => {
    return await eclairupdate.run({
      filter: { "items.product_id": selectedProductId || "" },
      update: { "$set": { "items.$.quantity": newQuantity || 0 } }
    });
  }
}
