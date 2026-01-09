// Trang quản lý đơn thuốc
import Link from "next/link";

// Giả lập dữ liệu đơn thuốc
const mockPrescriptions = [
  { id: "p1", patient: "Nguyễn Văn A", doctor: "Dr. Trần", date: "2025-12-01", summary: "Đơn thuốc cảm cúm" },
  { id: "p2", patient: "Phạm Thị B", doctor: "Dr. Lê", date: "2025-12-15", summary: "Đơn thuốc huyết áp" },
];

export default function PrescriptionsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Quản lý đơn thuốc</h1>
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Bệnh nhân</th>
            <th className="p-2 border">Bác sĩ</th>
            <th className="p-2 border">Ngày</th>
            <th className="p-2 border">Tóm tắt</th>
            <th className="p-2 border">Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {mockPrescriptions.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.patient}</td>
              <td className="p-2 border">{p.doctor}</td>
              <td className="p-2 border">{p.date}</td>
              <td className="p-2 border">{p.summary}</td>
              <td className="p-2 border"><Link href={`/dashboard/prescriptions/${p.id}`}>Xem</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/dashboard" className="text-blue-600">Quay lại Dashboard</Link>
    </div>
  );
}
