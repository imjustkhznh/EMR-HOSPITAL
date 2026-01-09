import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Giả lập dữ liệu bệnh nhân, thực tế sẽ lấy từ API
const mockPatient = {
  id: "1",
  name: "Nguyễn Văn A",
  dob: "1990-01-01",
  gender: "Nam",
  address: "Hà Nội",
  phone: "0123456789",
  medicalRecords: [
    { id: "mr1", date: "2025-12-01", summary: "Khám tổng quát" },
    { id: "mr2", date: "2025-12-15", summary: "Khám lại" },
  ],
};

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    // TODO: Gọi API lấy chi tiết bệnh nhân theo params.id
    setPatient(mockPatient); // Thay bằng dữ liệu thực tế
  }, [params.id]);

  if (!patient) return <div>Đang tải...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Hồ sơ bệnh nhân</h1>
      <div className="mb-2"><b>Họ tên:</b> {patient.name}</div>
      <div className="mb-2"><b>Ngày sinh:</b> {patient.dob}</div>
      <div className="mb-2"><b>Giới tính:</b> {patient.gender}</div>
      <div className="mb-2"><b>Địa chỉ:</b> {patient.address}</div>
      <div className="mb-2"><b>Số điện thoại:</b> {patient.phone}</div>
      <h2 className="text-lg font-semibold mt-6 mb-2">Hồ sơ khám bệnh</h2>
      <ul className="list-disc pl-6">
        {patient.medicalRecords.map((mr: any) => (
          <li key={mr.id}>
            <b>{mr.date}:</b> {mr.summary}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.push(`/dashboard/patients/edit/${patient.id}`)}>Sửa</button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => router.push('/dashboard/patients')}>Quay lại</button>
      </div>
    </div>
  );
}
