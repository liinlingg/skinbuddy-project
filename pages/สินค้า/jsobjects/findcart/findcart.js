export default {
  checkProductInCart: async () => {
    // ดึงข้อมูลจาก eclairfindcart (คิวรีข้อมูล)
    const cartItems = await eclairfindcart.run(); // ใช้ .run() เพื่อดึงข้อมูลจาก query ที่ใช้คิวรี่

    // ดึง productid ที่ต้องการเช็คจาก get_productid (คิวรีข้อมูล)
    const productIdToCheck = await get_productid.run(); // คาดว่า get_productid คืนค่าเป็น array ของ objects

    // เข้าถึง _id จากผลลัพธ์ของ get_productid (หากเป็น array)
    const productId = productIdToCheck[0]._id; // ดึง _id จากอาเรย์ตัวแรก

    // แสดงค่า productid ที่กำลังเช็ค
    console.log("Checking product ID:", productId); // แสดงใน console

    // เช็คว่า product_id นั้นมีอยู่ใน cart หรือไม่
    const isProductInCart = cartItems.some(cart => cart.items.some(item => item.product_id === productId));

    // ส่งผลลัพธ์
    return isProductInCart 
      ? `Product ID ${productId} is in the cart` 
      : `Product ID ${productId} is not in the cart`;
  }
}
