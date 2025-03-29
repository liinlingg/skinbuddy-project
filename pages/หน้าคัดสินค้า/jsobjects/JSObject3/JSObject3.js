export default {
    filterUsers: (data = test.data) => {
        let users = data;

        // ตรวจสอบว่ามีการเลือกค่าหรือไม่
        if (MultiSelect1.selectedOptionValues.length > 0 && !MultiSelect1.selectedOptionValues.includes('all')) {
            // กรองข้อมูลตาม category_id ที่ถูกเลือก
            users = users.filter(u => MultiSelect1.selectedOptionValues.includes(u.category_name));
        }

        // ถ้าเลือก 'all' หรือไม่มีการเลือกอะไรเลยให้แสดงทั้งหมด
        return users;
    }
}
