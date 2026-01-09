// Trang thống kê/báo cáo
import Link from "next/link";

export default function StatisticsPage() {
  // Giả lập số liệu thống kê
  const stats = {
    totalPatients: 120,
    totalDoctors: 15,
    totalPrescriptions: 200,
    totalRecords: 350,
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Thống kê & Báo cáo</h1>
      <ul className="mb-4">
        <li><b>Tổng số bệnh nhân:</b> {stats.totalPatients}</li>
        <li><b>Tổng số bác sĩ:</b> {stats.totalDoctors}</li>
        <li><b>Tổng số đơn thuốc:</b> {stats.totalPrescriptions}</li>
        <li><b>Tổng số hồ sơ khám bệnh:</b> {stats.totalRecords}</li>
      </ul>
      <Link href="/dashboard" className="text-blue-600">Quay lại Dashboard</Link>
    </div>
  );
}
