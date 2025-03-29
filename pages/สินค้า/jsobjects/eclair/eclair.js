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

    // ถ้า product_id ไม่อยู่ในตะกร้า
    if (!isProductInCart) {
      // รัน query Addcart เพื่อเพิ่ม product ไปในตะกร้า
      await Addcart.run({ product_id: productId }); // สมมติว่า Addcart ต้องการ parameter `product_id`
      
      // ปิด modal หลังจากการเพิ่มสินค้าในตะกร้า
      closeModal(Modal1.name); // ปิด modal

      // แสดง alert ว่าสินค้าได้ถูกเพิ่มเข้าไปในตะกร้า
      showAlert(`Product has been added to the cart!`, "success");

      // ส่งผลลัพธ์ว่าถูกเพิ่มเข้าไปในตะกร้าแล้ว
      return `Product ID ${productId} added to the cart`;
    } else {
      // ถ้า product_id อยู่ในตะกร้าแล้ว, ทำการ navigate ไปที่หน้า cart
      navigateTo("Cart"); // เรียกใช้งานคำสั่ง navigate ไปที่หน้า cart

      // แสดง alert ว่าสินค้าอยู่ในตะกร้าแล้ว
      showAlert(`Product is already in the cart. Navigating to cart...`, "info");

      return `Product ID ${productId} is already in the cart, navigating to cart page...`;
    }
  }
}
