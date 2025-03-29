export default {
  getTimes: () => {
    const selectedDoctorId = Dropdown1.selectedOptionValue;  // ค่าหมอที่เลือกจาก Dropdown

    // หาหมอที่เลือก
    const doctor = GetDoctors.data.find(d => d._id === selectedDoctorId);
    if (!doctor) return [];

    // ดึงข้อมูลการจองทั้งหมดของหมอในวันที่ปัจจุบัน
    const appointments = GetAppointments.data.filter(a => 
      a.doctor_id === selectedDoctorId && 
      a.date === moment().format("YYYY-MM-DD")
    );

    // สร้าง array ของเวลาที่จองแล้ว
    const bookedTimes = appointments.filter(a => a.time !== "").map(a => a.time);

    // กรองเวลาใน available_times โดยลบเวลาที่จองแล้ว
    return doctor.available_times
      .filter(time => !bookedTimes.includes(time))  // กรองเวลาออกที่มีการจอง
      .map(time => ({ label: time, value: time })); // แปลงให้เป็นรูปแบบที่ Dropdown ใช้
  }
}
