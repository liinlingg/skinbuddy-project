export default {
  runQueries: async () => {
    try {
      // รัน Query 1 (get_id)
      const response1 = await get_id.run();

      // เมื่อ Query 1 เสร็จแล้ว ให้รัน Query 2 (create_wallet)
      const response2 = await create_wallet.run();

      // ทำสิ่งที่ต้องการหลังจากทั้งสอง Query เสร็จ
      console.log('Query 1 และ Query 2 ทำงานเสร็จแล้ว');
      
      // แสดงข้อความแจ้งเตือนหลังจากที่ queries ทำงานเสร็จ
      showAlert("Account created successfully! Please Login", "success");
			
			setTimeout(() => {
        navigateTo("LoginPage"); 
      }, 2000);
      
      // ส่งค่าผลลัพธ์กลับไป
      return { response1, response2 };
    } catch (error) {
      // ถ้ามีข้อผิดพลาดให้แสดงข้อผิดพลาด
      console.error('เกิดข้อผิดพลาด:', error);
    }
  }
};
