export default {
    deleteAppointments: async () => {
        await DeleteAppointment.run(); // เรียก Query เพื่อลบข้อมูล
    },
    scheduleDeletion: () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // ตั้งเวลาเป็น 00:00:00 ของวันถัดไป

        const timeUntilMidnight = midnight - now;

        setTimeout(() => {
            this.deleteAppointments();
            setInterval(this.deleteAppointments, 24 * 60 * 60 * 1000); // รันทุก 24 ชั่วโมง
        }, timeUntilMidnight);
    }
}