"use client";
import Link from "next/link";

export default function MedicalRecordsPage() {
  const medicalRecordsList = [
    { id: 1, patient: "Nguyễn Văn A", lastVisit: "2025-12-30", status: "Hoạt động" },
    { id: 2, patient: "Phạm Thị B", lastVisit: "2025-12-25", status: "Hoạt động" },
    { id: 3, patient: "Lý Văn C", lastVisit: "2025-12-28", status: "Hoạt động" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📋 Hồ sơ bệnh án</h1>
        <p className="text-gray-600 mt-2">Danh sách hồ sơ bệnh án của các bệnh nhân</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Bệnh nhân</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Lần khám cuối</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Trạng thái</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {medicalRecordsList.map((record) => (
              <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-900 font-medium">{record.patient}</td>
                <td className="px-6 py-4 text-gray-600">{record.lastVisit}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/medical-records/${record.id}`}
                    className="text-blue-600 hover:text-blue-800 transition font-semibold"
                  >
                    Xem chi tiết →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
