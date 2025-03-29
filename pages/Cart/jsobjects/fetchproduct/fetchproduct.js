export default {
  getCartWithProductNames: async () => {
    // ดึงข้อมูลจาก getCart query
    const cartItems = await getCart.run();

    // ดึงข้อมูลจาก product_name query
    const products = await product_name.run();

    // ผนวกชื่อสินค้าเข้าไปใน cart
    const cartWithProductNames = cartItems.map(cart => {
      // สำหรับแต่ละรายการใน cart
      const updatedItems = cart.items.map(item => {
        // ค้นหาชื่อสินค้าจาก product_id ใน items
        const product = products.find(product => product._id === item.product_id);

        // ถ้าพบสินค้า, เพิ่มชื่อสินค้าลงไป
        return {
          ...item,
          product_name: product ? product.product_name : "Unknown Product" // ถ้าไม่พบชื่อสินค้า ให้ใช้ "Unknown Product"
        };
      });

      // ส่งคืนข้อมูล cart ที่มีการเพิ่ม product_name เข้าไป
      return {
        ...cart,
        items: updatedItems
      };
    });

    // ส่งผลลัพธ์ที่มีชื่อสินค้าเพิ่มเข้าไปในแต่ละรายการ
    return cartWithProductNames;
  }
}
