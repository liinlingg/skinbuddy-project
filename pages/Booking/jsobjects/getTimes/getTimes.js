export default {
  getTimes: () => {
    const selectedDoctorId = Dropdown1.selectedOptionValue; // ค่าหมอที่เลือก
    const doctor = GetDoctors.data.find(d => d._id === selectedDoctorId);
    if (!doctor) return [];
    
    // ดึงข้อมูลการจองทั้งหมดของหมอในวันนี้
    const appointments = GetAppointments.data.filter(a => 
      a.doctor_id === selectedDoctorId && 
      a.date === moment().format("YYYY-MM-DD")
    );
    
    // สร้าง array ของเวลาที่จองแล้ว
    const bookedTimes = appointments.filter(a => a.time !== "").map(a => a.time);
    
    // กรองเวลาใน available_times โดยลบเวลาที่จองแล้ว
    return doctor.available_times
      .filter(time => !bookedTimes.includes(time))
      .map(time => ({ label: time, value: time }));
  }
}
