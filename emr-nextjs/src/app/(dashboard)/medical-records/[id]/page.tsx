"use client";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - trong thực tế sẽ fetch từ API
const mockMedicalRecords = {
  "1": {
    patient: { id: "1", name: "Nguyễn Văn A", age: 35, gender: "male", phone: "0912345678", address: "Hà Nội" },
    records: [
      { id: "mr1", date: "2025-12-30", diagnosis: "Cảm cúm", prescription: "Paracetamol 500mg", notes: "Nghỉ ngơi 3 ngày" },
      { id: "mr2", date: "2025-12-20", diagnosis: "Viêm họng", prescription: "Kháng sinh", notes: "Uống thuốc đầy đủ" },
    ]
  },
  "2": {
    patient: { id: "2", name: "Phạm Thị B", age: 28, gender: "female", phone: "0987654321", address: "TP.HCM" },
    records: [
      { id: "mr3", date: "2025-12-25", diagnosis: "Sốt cao", prescription: "Aspirin", notes: "Tái khám sau 5 ngày" },
    ]
  },
  "3": {
    patient: { id: "3", name: "Lý Văn C", age: 45, gender: "male", phone: "0901234567", address: "Đà Nẵng" },
    records: [
      { id: "mr4", date: "2025-12-28", diagnosis: "Cao huyết áp", prescription: "Thuốc huyết áp", notes: "Kiểm tra định kỳ" },
    ]
  },
};

export default function MedicalRecordDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const record = mockMedicalRecords[params.id as keyof typeof mockMedicalRecords];

  if (!record) {
    return notFound();
  }

  const { patient, records } = record;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/medical-records"
            className="text-blue-600 hover:text-blue-800 transition mb-4 inline-flex items-center gap-2"
          >
            ← Quay lại
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">📋 Hồ sơ bệnh án</h1>
          <p className="text-gray-600 mt-2">Chi tiết thông tin bệnh nhân và lịch sử khám</p>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">👤 Thông tin bệnh nhân</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm font-medium">Tên</p>
            <p className="text-lg font-semibold text-gray-900">{patient.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Tuổi</p>
            <p className="text-lg font-semibold text-gray-900">{patient.age} tuổi</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Giới tính</p>
            <p className="text-lg font-semibold text-gray-900">
              {patient.gender === "male" ? "Nam" : "Nữ"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Số điện thoại</p>
            <p className="text-lg font-semibold text-gray-900">{patient.phone}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600 text-sm font-medium">Địa chỉ</p>
            <p className="text-lg font-semibold text-gray-900">{patient.address}</p>
          </div>
        </div>
      </div>

      {/* Medical Records */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Lịch sử khám</h2>
        <div className="space-y-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">{rec.date}</p>
                  <p className="text-xl font-bold text-gray-900">{rec.diagnosis}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Đã khám
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Đơn thuốc</p>
                  <p className="text-gray-900 mt-1">{rec.prescription}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Ghi chú</p>
                  <p className="text-gray-900 mt-1">{rec.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
          ✏️ Chỉnh sửa hồ sơ
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-semibold">
          📄 In hồ sơ
        </button>
      </div>
    </div>
  );
}
