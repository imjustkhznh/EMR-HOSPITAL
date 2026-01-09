// Trang chi tiết đơn thuốc
import Link from "next/link";

// Giả lập dữ liệu đơn thuốc
const mockPrescription = {
  id: "p1",
  patient: "Nguyễn Văn A",
  doctor: "Dr. Trần",
  date: "2025-12-01",
  summary: "Đơn thuốc cảm cúm",
  medicines: [
    { name: "Paracetamol", dose: "500mg", frequency: "2 lần/ngày" },
    { name: "Vitamin C", dose: "1000mg", frequency: "1 lần/ngày" },
  ],
};

export default function PrescriptionDetailPage({ params }: { params: { id: string } }) {
  // TODO: Lấy dữ liệu thực tế từ API bằng params.id
  const p = mockPrescription;
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn thuốc</h1>
      <div className="mb-2"><b>Bệnh nhân:</b> {p.patient}</div>
      <div className="mb-2"><b>Bác sĩ:</b> {p.doctor}</div>
      <div className="mb-2"><b>Ngày:</b> {p.date}</div>
      <div className="mb-2"><b>Tóm tắt:</b> {p.summary}</div>
      <h2 className="text-lg font-semibold mt-6 mb-2">Thuốc kê đơn</h2>
      <ul className="list-disc pl-6">
        {p.medicines.map((m, idx) => (
          <li key={idx}><b>{m.name}</b> - {m.dose} - {m.frequency}</li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href="/dashboard/prescriptions" className="text-blue-600">Quay lại danh sách</Link>
      </div>
    </div>
  );
}
