import Link from "next/link";
import type { Metadata } from "next";
import "@/app/components/index.css";

export const metadata: Metadata = {
  title: "Quản lý Bệnh nhân",
  description: "Danh sách và quản lý thông tin chi tiết bệnh nhân. Xem lịch sử khám bệnh, thông tin cá nhân và hồ sơ y tế",
  keywords: ["bệnh nhân", "patient list", "medical records", "quản lý bệnh nhân"],
  openGraph: {
    title: "Quản lý Bệnh nhân - EMR Hospital",
    description: "Danh sách và quản lý thông tin chi tiết bệnh nhân",
    type: "website",
  },
};

// Revalidate every 60 seconds (ISR - Incremental Static Regeneration)
// This means: static at build, then revalidate on each request after 60s
export const revalidate = 60;

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  email: string;
  medicalHistory: string;
}

async function getPatients(): Promise<Patient[]> {
  // Server Component: SSR with ISR
  // Fetch data at request time, cache for 60s (revalidate option)
  const patients = await import("@/data/patients.json").then((m) => m.default);
  return patients;
}

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-5xl">👥</span> Quản lý Bệnh nhân
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Tổng số: {patients.length} bệnh nhân</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          + Thêm bệnh nhân
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header with Search */}
        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm bệnh nhân theo tên, số điện thoại..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên Bệnh nhân</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tuổi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Giới tính</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Địa chỉ</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-blue-50 transition group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.age} tuổi</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
                      {patient.gender === "Nam" ? "👨 Nam" : "👩 Nữ"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">{patient.address}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/medical-records/${patient.id}`}
                        className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition"
                      >
                        Chi tiết
                      </Link>
                      <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition">
                        ⋮
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-600">Hiển thị 1 đến 10 của {patients.length} bệnh nhân</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              Trước
            </button>
            <button className="px-3 py-2 text-sm border border-blue-600 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">2</button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              Tiếp
            </button>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-5">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">ℹ️ Server-Side Rendering:</span> Danh sách bệnh nhân được tải từ server, đảm bảo dữ liệu luôn mới nhất và tối ưu SEO.
        </p>
      </div>
    </div>
  );
}
